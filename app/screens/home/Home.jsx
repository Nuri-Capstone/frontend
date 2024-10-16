import React, { useState } from "react";
import Styled from 'styled-components';
import RNPickerSelect from "react-native-picker-select";
import Swiper from 'react-native-swiper';
import { feedbackData, defaultFeedback} from "../../mock-data/monthlyFeedbackData";

function Home(){
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState(10);

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

    // 선택된 년도와 월에 해당하는 피드백 데이터를 불러오거나, 없으면 기본 피드백 데이터 사용
    const currentFeedback = feedbackData[selectedYear]?.[selectedMonth] || defaultFeedback;
    


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
                            <StyledFeedbackCard key={index}>
                                <StyledSummaryTitle>{index + 1}. {feedback.title}</StyledSummaryTitle>
                                <StyledSummaryContent>{feedback.content}</StyledSummaryContent>
                            </StyledFeedbackCard>
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