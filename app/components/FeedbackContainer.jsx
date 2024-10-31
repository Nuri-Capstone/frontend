import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Styled from "styled-components";

function FeedbackContainer() {
    const [showFeedback, setShowFeedback] = useState(false);
    const feedbackOptions = ["Grammar", "Vocabulary", "By age group", "Formal / Informal"];
    const toggleFeedback = () => {
      setShowFeedback(!showFeedback); // 버튼 클릭 시 피드백 창 토글
    };
    
  return (
    <>
    <ButtonContainer>
    <Image source={require('../assets/images/translateButton.png')} style={{ width: 15, height: 15 }} />
      <TouchableOpacity onPress={toggleFeedback}>
        <Image source={require('../assets/images/feedbackButton.png')} style={{ width: 16, height: 15 }} />
      </TouchableOpacity>
      
    </ButtonContainer>

    {showFeedback && (
        <FeedbackContainers>
        {feedbackOptions.map((option, index) => (
            <FeedbackOption
            key={index}
            style={{
                borderBottomWidth: index === feedbackOptions.length - 1 ? 0 : 1,
                borderBottomColor: "#B9B7B7"
            }}
            >
            {option}
            </FeedbackOption>
        ))}
        </FeedbackContainers>
    )}
    </>
  );
}

export default FeedbackContainer;

const ButtonContainer = Styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-right: 5px;
  gap: 5px;
`;

const FeedbackContainers = Styled.View`
  background-color: #FFFFFF;
  border: 1px solid #B9B7B7;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  width: 247px;

`;

const FeedbackOption = Styled.Text`
  padding: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #B9B7B7;
  font-size: 14px;
  text-align: center;
  color: black;
`;
