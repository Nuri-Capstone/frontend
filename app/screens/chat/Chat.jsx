import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Styled from "styled-components";
import MessageContainer from "../../components/MessageContainer";
import FeedbackContainer from "../../components/FeedbackContainer";
import { chatData } from "../../mock-data/chatData";

function Chat() {

  return (
    <StyledView>
      <Header>Nuri</Header>
      
      <ChatSection>
        <MessageBox>
            <GPTText>안녕하세요! 오늘은 어떤 주제를 얘기할까요?</GPTText>
        </MessageBox>
        {chatData.map((item, index) => (
          <React.Fragment key={item.msgID}>
            <MessageContainer chat={item} />
          </React.Fragment>
        ))}
      </ChatSection>

      <StyledEndButton>
        <Image source={require('../../assets/images/endButton.png')} style={{ width: 70, height: 40 }}/>
      </StyledEndButton>

      <StyledMicButton>
        <Image source={require('../../assets/images/micButton.png')} style={{ width: 66, height: 66 }}/>
      </StyledMicButton>
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
