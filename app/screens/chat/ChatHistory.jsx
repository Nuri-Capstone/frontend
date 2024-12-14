import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import Styled from "styled-components";
import MessageContainer from "../../components/MessageContainer";
//import FeedbackContainer from "../../components/FeedbackContainer";
import { useNavigation } from '@react-navigation/native'; 


function ChatHistory({ route }) {
    const { chatId, subject, summary } = route.params; // 전달받은 chatId
    const [messages, setMessages] = useState([]);
    //const [chatId, setChatId] = useState(null);// 채팅 아이디 상태
    const navigation = useNavigation(); 

    const showChatList = () => {
        navigation.navigate('ChatList');
    };

    useEffect(() => {
        const fetchChatMessage = async () => {
            try {
                console.log('채팅 아이디는  ',chatId);
                const response = await fetch(`http://10.0.2.2:8080/api/msg/${chatId}`);
                const data = await response.json();
                console.log('채팅 내역: ', data);
                setMessages(data);
            } catch (error) {
                console.error("Error fetching chat messages:", error);
            }
    };
        fetchChatMessage();
    }, []);

    return (
      <StyledView>
        <TitleSection>
          <BackButton >
            <TouchableOpacity onPress={showChatList}>
            
            <Image source={require('../../assets/images/backButton.png')} style={{ width: 25, height: 25 }}/>
            
            </TouchableOpacity>
            </BackButton>
          <Header>{subject}</Header>

        </TitleSection>
      <ChatSection>
        <ScrollView>
          <MessageBox>
              <GPTText>안녕하세요! 어떤 대화를 나누고싶나요?</GPTText>
          </MessageBox>
          
          {messages.length > 0 && messages.map((item, index) => (
            <React.Fragment key={index}>
              <MessageContainer chat={item} />
            </React.Fragment>
          ))}
        
            <SummarySection>
            <SummaryTitle>Summary</SummaryTitle>
            <SummaryBox>
              <SummaryContent>
                {summary}
              </SummaryContent>
            </SummaryBox>
          </SummarySection>

        </ScrollView>
      </ChatSection>
    </StyledView>
  );
}

export default ChatHistory;

const StyledView = Styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
  position: relative;
`;

const Header = Styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 20px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const BackButton = Styled.View`
  top: 33px;
  left: 10px;
`;

const TitleSection = Styled.View`
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

