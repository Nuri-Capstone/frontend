import React, { useState, useEffect, useRef } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Styled from "styled-components";
import MessageContainer from "../../components/MessageContainer";
import FeedbackContainer from "../../components/FeedbackContainer";
import { chatData } from "../../mock-data/chatData";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

// WebSocket 주소 (스프링 부트 서버의 WebSocket 엔드포인트 URL)
const WEBSOCKET_URL = "ws://localhost:8080/ws/chat";

function Chat() {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState(chatData);
  const [chatId, setChatId] = useState(null);// 채팅 아이디 상태
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState(null);

  const startRecording = async () => {
    setIsRecording(true);
    const result = await audioRecorderPlayer.startRecorder();
    setRecordedFilePath(result);
  };

   const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setIsRecording(false);
    setRecordedFilePath(result); // 녹음된 파일 경로 저장
    sendRecordingToServer(result); // 서버로 파일 전송
  };


  const sendRecordingToServer = async (filePath) => {
    // 파일을 Blob으로 변환 후 전송
    const response = await fetch(filePath);
    const blob = await response.blob();

    if (ws.current && isConnected) {
      ws.current.send(blob); // Blob 형태로 WebSocket 전송
    } else {
      console.error("WebSocket이 연결되어 있지 않습니다.");
    }
  };

  
  useEffect(() => {
    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received:", message);
      // 채팅방 아이디 설정
      if (!chatId && message.chatId) {
        setChatId(message.chatId); // 채팅 아이디 저장
      }
      // 새 메시지를 기존 메시지에 추가하여 상태 업데이트
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket connection closed", event);
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const sendMessage = (text) => {
    if (ws.current && isConnected) {
      const message = { chatId: chatId, msgText: text, msgType: "user" };
      ws.current.send(JSON.stringify(message));
    } else {
      console.error("!!!!! WebSocket is not connected !!!!!");
    }
  };

  return (
    <StyledView>
      <Header>Nuri</Header>
      
      <ChatSection>
        <MessageBox>
            <GPTText>안녕하세요! 오늘은 어떤 주제를 얘기할까요?</GPTText>
        </MessageBox>
        
        {/* {messages.map((item, index) => (
          <React.Fragment key={index}>
            <MessageContainer chat={item} />
          </React.Fragment>
        ))} */}
      </ChatSection>

      <StyledEndButton>
        <TouchableOpacity>
        <Image source={require('../../assets/images/endButton.png')} style={{ width: 70, height: 40 }}/>
        </TouchableOpacity>
      </StyledEndButton>

      <StyledMicButton>
        <TouchableOpacity 
            onPressIn={startRecording}
            onPressOut={stopRecording}
        > 
        <Image source={require('../../assets/images/micButton.png')} style={{ width: 66, height: 66 }}/>
        </TouchableOpacity>
      </StyledMicButton>

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