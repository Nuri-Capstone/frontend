import React from "react";
import { Text, Image } from 'react-native';
import Styled from 'styled-components';

function ConversationList(){
    return(
        <>
            <StyledDateText>
                2024.09.27
            </StyledDateText>
            <StyledTalkDiv>
                <StyledTalkImage>
                    <Image source={require('../assets/images/talkImage.png')}/>
                </StyledTalkImage>
                <StyledTalkTopicDiv>
                    <StyledSummaryText>한국의 문화에 대한 이야기</StyledSummaryText>
                </StyledTalkTopicDiv>
            </StyledTalkDiv>
        </>
    )
}

export default ConversationList;

const StyledDateText = Styled.Text`
    color: #7D7C7C;
    position: relative;
    font-family: 'Pretendard-Medium';
    font-style: normal;
    font-weight: 400px;
    font-size: 13px;
    line-height: 20px;
`;

const StyledTalkDiv = Styled.View`
    padding-top: 7px;
    display: flex;
    flex-direction: row;
    align-items:center;
    gap:11px;
`;

const StyledTalkImage = Styled.View`
    
`;

const StyledTalkTopicDiv = Styled.View`
    background-color: rgba(251, 225, 130, 0.65);
    border: 1px;
    border-color: #B9B7B7;
    border-radius: 10px;
    width: 82%;
    height: 39px;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const StyledSummaryText = Styled.Text`
    color: #000000;
    position: relative;
    font-family: 'Pretendard-Medium';
    font-style: normal;
    font-weight: 400px;
    font-size: 16px;
    line-height: 20px;
`;