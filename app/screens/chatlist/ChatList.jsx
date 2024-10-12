import React from "react";
import { Text, Dimensions, Image } from 'react-native';
import Styled from 'styled-components';
import ConversationList from "../../components/ConversationList";

function ChatList(){
    const { height, width } = Dimensions.get('window');
    return (
        <>
            <StyledView>
                <StyledConversations>Conversations</StyledConversations>
                <StyledViewList dynamicHeight={height * 0.65}>
                    <ConversationList/>
                    <StyledConversationLine/>
                    <ConversationList/>
                    <StyledConversationLine/>
                    <ConversationList/>
                    <StyledConversationLine/>
                    <ConversationList/>
                    <StyledConversationLine/>
                </StyledViewList>
                <StyledAddButton>
                    <Image source={require('../../assets/images/addButton.png')}/>
                </StyledAddButton>
            </StyledView>
        </>
    );
}

export default ChatList;

const StyledView = Styled.View`
    display: flex;
    flex: 1;
    background-color: #ffffff;
`;

const StyledConversations = Styled.Text`
    padding-top: 24px;
    padding-left: 32px;
    position: relative;
    font-family: 'Pretendard-Medium';
    font-style: normal;
    font-weight: 400px;
    font-size: 20px;
    line-height: 20px;
    color: #000000;
`;

const StyledViewList = Styled.View`
    margin: 13px 20px 13px 20px;
    padding: 14px 18px;
    position: relative;
    border: 1px;
    border-radius: 10px;
    border-color: #B9B7B7;
    width: 90%;
    height: ${props => `${props.dynamicHeight}px`};
`;

const StyledConversationLine = Styled.View`
    border: 0.5px #B9B7B7;
    margin-top:16px;
    margin-bottom:5px;
`;

const StyledAddButton = Styled.View`
    width: 95%;
    flex:1;
    flex-direction: row;
    display: flex;
    justify-content: flex-end;
`;