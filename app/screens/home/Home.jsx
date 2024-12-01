import React, { useState, useEffect } from "react";
import Styled, { keyframes } from 'styled-components';
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import {defaultFeedback} from "../../mock-data/monthlyFeedbackData";

function Home(){
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState(10);
    const [currentFeedback, setCurrentFeedback] = useState(defaultFeedback);

    const years = Array.from({ length: 27 }, (_, index) => {
        const year = 2024 + index;
        return { label: `${year}년`, value: year };
    });

    const months = [
        { label: "1월", value: 1 },
        { label: "2월", value: 2 },
        { label: "3월", value: 3 },
        { label: "4월", value: 4 },
        { label: "5월", value: 5 },
        { label: "6월", value: 6 },
        { label: "7월", value: 7 },
        { label: "8월", value: 8 },
        { label: "9월", value: 9 },
        { label: "10월", value: 10 },
        { label: "11월", value: 11 },
        { label: "12월", value: 12 },
    ];

    const fetchMonthlyFeedback = async (year, month) => {
        try {
            const userId = 195;       // 이후 실제 userID로 넣어야 함
            console.log("userId: " + userId);
            console.log("month: " + month);
            const response = await fetch(`http://10.0.2.2:8080/home/monthlyFeedback/${userId}/${year}/${month}`);

            console.log(response);
            const data = await response.json();
            console.log(data);

            const responseFeedback = [
                {title: "문법 피드백", content: data.grammar.content},
                {title: "어휘 피드백", content: data.vocabulary.content},
                // {title: "연령별 대화 피드백", content: data.ageInGroup.content},
                {title: "경어체 피드백", content: data.formalInformal.content},
            ]

            setCurrentFeedback(responseFeedback);
        } catch (error) {
            console.error("데이터 가져오기 실패: ", error);
            setCurrentFeedback(defaultFeedback);
        }
    };

    useEffect(() => {
        fetchMonthlyFeedback(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);


    return (
        <StyledView>




            <StyledRanking>

            </StyledRanking>




            <StyledSummary>
                <StyledDatePickerRow>
                    <StyledPickerYear>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedYear(value)}
                            items={years}
                            value={selectedYear}
                            placeholder={{ label: "년도 선택", value: null }}
                        />
                    </StyledPickerYear>
                    <StyledPickerMonth>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedMonth(value)}
                            items={months}
                            value={selectedMonth}
                            placeholder={{ label: "월 선택", value: null }}
                        />
                    </StyledPickerMonth>
                </StyledDatePickerRow>
                
                <StyledSummaryMonth>
                    {selectedYear}년 {selectedMonth}월 피드백
                </StyledSummaryMonth>


                <StyledSwiperContainer>
                    <Swiper 
                        showsPagination={true} 
                        loop={false}
                        dotColor="gray"
                        activeDotColor="black"
                        paginationStyle={{ top : -150 }}
                    >
                        {currentFeedback.map((feedback, index) => (
                            <ScrollView key={index} style={{ flex: 1 }}>
                                <StyledFeedbackCard key={index}>
                                <StyledSummaryTitle>{index + 1}. {feedback.title}</StyledSummaryTitle>
                                <StyledSummaryContent>{feedback.content}</StyledSummaryContent>
                            </StyledFeedbackCard>
                            </ScrollView>
                        ))}
                    </Swiper>
                </StyledSwiperContainer>

            </StyledSummary>
        </StyledView>
    );
}

const StyledView = Styled.View`
    display: flex;
    flex: 1;
    background-color: #ffffff;
`;


const StyledRanking = Styled.View``;




const StyledSummary = Styled.View``;

const StyledDatePickerRow = Styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StyledPickerYear = Styled.View`
    display: flex;
    width: 30%;
`;

const StyledPickerMonth = Styled.View`
    width: 25%;
`;

const StyledSummaryMonth = Styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`;

const StyledSwiperContainer = Styled.View`
    height: 250px;
`;

const StyledFeedbackCard = Styled.View`
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin: 10px;
    height: 350px;
    justify-content: flex-start
`;

const StyledSummaryTitle = Styled.Text`
    fontWeight: bold;
    margin-top: 20px;
`;

const StyledSummaryContent = Styled.Text`
    margin-top: 15px;
`;



export default Home;