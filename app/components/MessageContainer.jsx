import React from "react";
import { View, Image } from "react-native";
import Styled from "styled-components";
import FeedbackContainer from "../components/FeedbackContainer";

function MessageContainer({ chat, ws }) { 
  const { msgType, msgText, msgId } = chat;

  return (
    <Container>
      {msgType === "user" ? (
        <MessageContainers>
          <ImageAndTextSection>
            <ProfileImage source={require('../assets/images/userImg.png')} />
            <MessageContentUser>
                <UserTextBox>
                    <UserText>{msgText}</UserText>
                </UserTextBox>
            </MessageContentUser>
          </ImageAndTextSection>
          
          <ButtonSection>
            <FeedbackContainer msgText={msgText} msgId={msgId} ws={ws}/>
          </ButtonSection>
        
        </MessageContainers>
      ) : (
        <MessageContentGPT>
            <GptText>{msgText}</GptText>
        </MessageContentGPT>
      )}
    </Container>
  );
}

export default MessageContainer;


const ImageAndTextSection = Styled.View`
  flex-direction: row-reverse; 
  align-items: center;
`;
const ButtonSection = Styled.View`
  flex-direction: row-reverse; 
  margin-right: 35px;
`;

const MessageContainers = Styled.View`
  flex-direction: column;
`;

const MessageContentUser = Styled.View`
  flex-direction: column;
  align-items: flex-end; 
`;

const UserTextBox = Styled.View`
  background-color: #FCEBAF;
  border: 1px #B9B7B7;
  padding: 10px;
  max-width: 260px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const UserText = Styled.Text`
  color: black;
  font-size: 16px;
`;

const ProfileImage = Styled.Image`
  width: 28px;
  height: 28px;
  margin: 20px 1px 0px 10px; 
`;

const MessageContentGPT = Styled.View`
  background-color: white;
  border: 1px #B9B7B7;
  padding: 10px;
  margin-bottom: 10px;
  align-self: flex-start;
  max-width: 70%;
  border-radius: 10px;

`;

const GptText = Styled.Text`
    color: black;
    font-size: 16px;
`;

const Container = Styled.View`
  margin-bottom: 5px;
`;