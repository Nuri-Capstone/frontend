import React, { useState, useEffect, useRef } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import Styled from "styled-components";
import MessageContainer from "../../components/MessageContainer";
import FeedbackContainer from "../../components/FeedbackContainer";
import { chatData } from "../../mock-data/chatData";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";

const audioRecorderPlayer = new AudioRecorderPlayer();

// WebSocket 주소 (스프링 부트 서버의 WebSocket 엔드포인트 URL)
const WEBSOCKET_URL = "ws://10.0.2.2:8080/ws/voice";

function Chat() {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);// 채팅 아이디 상태
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState(null);
  const [showEndButton, setShowEndButton] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState(null);
  const [token, setToken] = useState(null);
  const [showMicButton, setShowMicButton] = useState(true);

  const [newChat, setNewChat] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const startRecording = async () => {
    setIsRecording(true);
    try {
      SoundPlayer.stop(); // 녹음 전에 모든 재생 중지
      const result = await audioRecorderPlayer.startRecorder();
      setRecordedFilePath(result);
      console.log("녹음 시작:", result);
    } catch (error) {
      console.error("녹음 시작 중 오류 발생:", error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      setRecordedFilePath(result); // 녹음된 파일 경로 저장
      console.log("녹음 중지:", result);
      sendRecordingToServer(result); // 서버로 파일 전송
    } catch (error) {
      console.error("녹음 중지 중 오류 발생:", error);
    }
  };

  const playAudioFromS3 = async (s3Url) => {
    console.log("playAudioFromS3 호출됨, URL:", s3Url);
    if (isRecording) {
      console.log("현재 녹음 중이므로 재생할 수 없습니다.");
      return;
    }
    try {
      SoundPlayer.stop(); // 기존 재생 중인 오디오 중지
      SoundPlayer.playUrl(s3Url);
    } catch (error) {
      console.error("S3에서 오디오 파일을 가져오는 중 오류 발생:", error);
    }
  };

  const sendRecordingToServer = async (filePath) => {
    try {
        const response = await fetch(filePath);
        const blob = await response.blob(); // Blob 객체 생성
        if (ws.current && isConnected) {
            ws.current.send(blob); // Blob을 WebSocket으로 전송
            console.log("오디오 데이터 전송 완료");
        } else {
            console.error("WebSocket이 연결되어 있지 않습니다.");
        }
    } catch (error) {
        console.error("오디오 파일을 읽는 중 오류 발생:", error);
    }
};

  // summary 전송
  const fetchSummary = async () => {
    console.log(chatId);
    const response = await fetch(`http://10.0.2.2:8080/api/msg/summary/${chatId}`);
    const data = await response.json();
    console.log(data);
    setSummary(data.summary);
    console.log(data);
  };
  
  // 채팅 종료
  const endChat = async () => {
    if (isConnected) {
      await fetchSummary();
      ws.current.close();
      setIsConnected(false);
      setShowEndButton(false);
      setShowMicButton(false);
      setShowSummary(true); // 후에 삭제
      //setNewChat(false); 
      console.log("채팅과 웹소켓 연결 종료");    
    }
  };

  const resetChat = () => {
    setMessages([]);
    setShowEndButton(true);
    setShowMicButton(true);
    setShowSummary(false);
    setChatId(null);
    setNewChat(false); // 새 채팅 상태 초기화
    navigation.setParams({ newChat: false }); // route.params 초기화
  };

  // 토큰을 가져와서 상태에 저장
  const fetchToken = async () => {
    const realToken = await AsyncStorage.getItem('userToken');
    if (realToken) {
      let newToken = 'Bearer ' + realToken;
      setToken(newToken);
    } else {
      console.error('토큰이 없습니다. 로그인하세요.');
    }
  };

  // WebSocket 초기화 및 연결
  const initializeWebSocket = () => {
    if (ws.current) {
      ws.current.close(); // 기존 연결 닫기
    }

    ws.current = new WebSocket(WEBSOCKET_URL, [token]);
    ws.current.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket 연결됨");
    };
    ws.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "INITIAL") {
        setChatId(message.chatId);
        console.log("새채팅 아이디: ", message.chatId);
      } else if (message.audioUrl) {  // S3 URL이 포함된 경우 재생 시작
        console.log("Received S3 URL:", message.audioUrl);
        await playAudioFromS3(message.audioUrl);
      } else {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    ws.current.onclose = () => setIsConnected(false);
    ws.current.onerror = (error) => console.error("WebSocket error:", error);
  };


  // newChat 상태 처리
  useEffect(() => {
    if (route.params?.newChat) {
      console.log("새 채팅 시작");
      resetChat();
      initializeWebSocket(); // WebSocket 재연결
      navigation.setParams({ newChat: false }); // newChat 상태 초기화
    }
  }, [route.params?.newChat]);

  // 토큰이 변경될 때 WebSocket 연결
  useEffect(() => {
    if (token) {
      initializeWebSocket();
    }
  }, [token]);

  // 페이지 로드 시 토큰 가져오기
  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <StyledView>
      <Header>Nuri</Header>
      
      <ChatSection>
        <ScrollView>
          <MessageBox>
              <GPTText>안녕하세요! 어떤 대화를 나누고싶나요?</GPTText>
          </MessageBox>
          
          {messages.length > 0 && messages.map((item, index) => (
            <React.Fragment key={index}>
              <MessageContainer chat={item} ws={ws} />
            </React.Fragment>
          ))}
        
          {showSummary && (
            <SummarySection>
            <SummaryTitle>Summary</SummaryTitle>
            <SummaryBox>
              <SummaryContent>
                {summary}
              </SummaryContent>
            </SummaryBox>
          </SummarySection>
          )}
        </ScrollView>
      </ChatSection>

      {showEndButton && (
        <StyledEndButton>
          <TouchableOpacity onPress={endChat}>
          <Image source={require('../../assets/images/endButton.png')} style={{ width: 70, height: 40 }}/>
          </TouchableOpacity>
        </StyledEndButton>
      )}

      {showMicButton && (
        <StyledMicButton>
          <TouchableOpacity 
              onPressIn={startRecording}
              onPressOut={stopRecording}
          > 
          <Image source={require('../../assets/images/micButton.png')} style={{ width: 66, height: 66 }}/>
          </TouchableOpacity>
        </StyledMicButton>
      )}

      {isRecording && <RecordingIndicator>녹음 중...</RecordingIndicator>}
    </StyledView>
  );
}

export default Chat;


const StyledView = Styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
  position: relative;
`;

const Header = Styled.Text`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 20px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const ChatSection = Styled.View`
  flex: 2;
  margin-top: 20px;
`;

const MessageBox = Styled.View`
  background-color: white;
  border: 1px #B9B7B7;
  padding: 10px;
  margin-bottom: 10px;
  align-self: flex-start;
  max-width: 70%;
  border-radius: 10px;
`;

const GPTText = Styled.Text`
  color: black;
  font-size: 16px;
`;

const StyledEndButton = Styled.View`
  position: absolute;
  bottom: 44px;
  left: 38px;
`;

const StyledMicButton = Styled.View`
  position: absolute;
  bottom: 34px;
  right: 25px;
`;

const RecordingIndicator = Styled.Text`
  position: absolute;
  bottom: 100px;
  left: 50%;
  color: red;
  font-size: 16px;
`;
const SummarySection = Styled.View`
  border-top-width: 0.5px;
  border-top-color: #6E6E6E;
  width: 330px;

  margin: auto;
`;
const SummaryTitle = Styled.Text`
  font-size: 20px;
  color: black;
  margin: 10px;
`;


const SummaryBox = Styled.View`
  background-color: #F1F1F1;
  border: 1px #B9B7B7;
  border-radius: 10px;
  width: 310px;
  min-height: 50px;
  margin: auto;

`;
const SummaryContent = Styled.Text`
  color: black;
  margin: auto;
`;