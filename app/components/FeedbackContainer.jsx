import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Styled from "styled-components";

function FeedbackContainer({ msgText, msgId, ws }) {
    const [showFeedback, setShowFeedback] = useState(false); // 피드백 창 열기/닫기
    const [expandedFeedback, setExpandedFeedback] = useState({}); // 각 피드백 항목의 토글
    const [loadingStates, setLoadingStates] = useState({});
    const [feedbackResponses, setFeedbackResponses] = useState({}); // 모든 응답 데이터 저장

    const feedbackOptions = ["Grammar", "Vocabulary", "Formal / Informal"];
    
    // 버튼 클릭 시 피드백 창 토글
    const toggleFeedback = () => {
        setShowFeedback(!showFeedback); 
    };

    // 응답 표시 토글
    const toggleResponse = (option) => {
        setExpandedFeedback((prevState) => ({
            ...prevState,
            [option]: !prevState[option], // 기존 상태 반전
        }));
    };

    // 피드백 요청
    const requestFeedback = async (option) => {
        if (feedbackResponses[option]) {
          console.log(`${option}에 대한 피드백은 이미 요청되었습니다.`);
          return;
        }
    
        try {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                setLoadingStates((prev) => ({
                    ...prev,
                    [option]: true,
                }));
    
                const requestData = {
                    msgText: msgText,
                    msgId: msgId,
                    feedbackType: option, // 피드백 유형
                };
    
                // WebSocket으로 요청 데이터 전송
                ws.current.send(JSON.stringify(requestData));
                console.log(`${option} 피드백 요청 전송 완료`);
    
                // WebSocket 응답 대기
                ws.current.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    
                    setFeedbackResponses((prev) => ({
                    ...prev,
                    [option]: data.content || "피드백 데이터를 찾을 수 없습니다.",
                    }));
                    
                    console.log("피드백: ", data);
                };
            } else {
                throw new Error("WebSocket 연결 실패");
            }
        
        } catch (error) {
            console.error(`${option} 피드백 요청 중 오류 발생:`, error);
            setFeedbackResponses((prev) => ({
                ...prev,
                [option]: "요청 중 오류가 발생했습니다.",
            }));
        } finally {
            setLoadingStates((prev) => ({
                ...prev,
                [option]: false,
            }));
        }
    };

    return (
        <>
            <ButtonContainer>
                {/* <Image source={require('../assets/images/translateButton.png')} style={{ width: 15, height: 15 }} /> */}
                <TouchableOpacity onPress={toggleFeedback}>
                    <Image source={require('../assets/images/feedbackButton.png')} style={{ width: 16, height: 15 }} />
                </TouchableOpacity>
            </ButtonContainer>

            {showFeedback && (
                <FeedbackContainers>
                    {feedbackOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                toggleResponse(option); // 응답 표시 토글
                                requestFeedback(option); // API 요청
                            }}
                            style={{
                                borderBottomWidth: index === feedbackOptions.length - 1 ? 0 : 1,
                                borderBottomColor: "#B9B7B7",
                            }}
                        >
                            <FeedbackOptionText>{option}</FeedbackOptionText>

                            {expandedFeedback[option] && (
                                <FeedbackResponseContainer>
                                    {loadingStates[option] ? (
                                        <ActivityIndicator size="small" color="#0000ff" />
                                    ) : (
                                        <FeedbackText>{`${feedbackResponses[option]}`}</FeedbackText>
                                    )}
                                </FeedbackResponseContainer>
                            )}
                        </TouchableOpacity>
                    ))}
                </FeedbackContainers>
            )}
        </>
    );
}

export default FeedbackContainer;

// Styled Components
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
  margin-top: 20px;
  margin-right: -17px; 
  max-width: 250px;
`;

const FeedbackOptionText = Styled.Text`
  font-size: 14px;
  color: black;
  text-align: center;
  margin: 3px;
`;

const FeedbackResponseContainer = Styled.View`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #FFF3CA;
  border-radius: 10px;
`;

const FeedbackText = Styled.Text`
  font-size: 13px;
  color: black;
  padding: 3px 0;
  
`;