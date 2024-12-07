import React, { useState, useEffect } from "react";
import Styled, { keyframes } from 'styled-components';
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import {defaultFeedback} from "../../mock-data/monthlyFeedbackData";

import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

function Home(){
    const [userRanking, setUserRanking] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState(10);
    const [currentFeedback, setCurrentFeedback] = useState(defaultFeedback);

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(100, 55, 55, ${opacity})`,
        strokeWidth: 3,
        useShadowColorFromDataset: true,
    };

    const [msgCnt, setMsgCnt] = useState({
        labels: [],
        datasets: [
          {
            data: [],
            color: () => `rgba(252, 235, 175, 1)`,
            strokeWidth: 1,
          },
        ],
        legend: ["대화 수 랭킹"],
    });


    // const dummyData = [
    //     { date: '2024-01-01', totalMsgCnt: 10 },
    //     { date: '2024-02-01', totalMsgCnt: 25 },
    //     { date: '2024-03-01', totalMsgCnt: 40 },
    //     { date: '2024-04-01', totalMsgCnt: 55 },
    //     { date: '2024-05-01', totalMsgCnt: 70 },
    //   ];

    const fetchData = async () => {
        try {
          const userId = 1;
          const response = await fetch(`http://10.0.2.2:8080/home/graph/${userId}`);
          const data = await response.json();

        //   더미 데이터를 사용하여 테스트
        //   const data = dummyData;
    
          if (Array.isArray(data)) {
            // 데이터를 받아서 labels와 datasets의 data 배열을 업데이트
            const labels = [];
            const dataValues = [];
    
            data.forEach((item) => {
              const date = new Date(item.date); // 'yyyy-mm-01' 형태
              labels.push(`${date.getFullYear()}-${date.getMonth() + 1}`); // 'yyyy-mm' 형식으로 변환
              dataValues.push(item.totalMsgCnt);
            });
    
            setMsgCnt((prev) => ({
              ...prev,
              labels,
              datasets: [
                {
                  ...prev.datasets[0],
                  data: dataValues,
                },
              ],
            }));
          } else {
            console.error("올바르지 않은 데이터 형식:", data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    const fetchRanking = async () => {
      const allUserResponse = await fetch('http://10.0.2.2:8080/home/ranking/allUsers');
      const allUserData = await allUserResponse.json();
      setTotalUsers(allUserData);

      const userRankingResponse = await fetch(`http://10.0.2.2:8080/home/ranking/${userId}`);
      const userRankingData = await userRankingResponse.json();
      setUserRanking(userRankingData);
    };

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
        fetchData();
    }, []);

    useEffect(() => {
        fetchRanking();
    }, [userId]);

    useEffect(() => {
        fetchMonthlyFeedback(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);


    return (
        <StyledView>
            <StyledProfileContainer>
                <StyledProfileText>사용자 님의 순위는 {userRanking}/{totalUsers} 위입니다!{"\n"}아주 잘하고 있어요!</StyledProfileText>
                <StyledProfileImage source={{ uri: "https://i.namu.wiki/i/M0j6sykCciGaZJ8yW0CMumUigNAFS8Z-dJA9h_GKYSmqqYSQyqJq8D8xSg3qAz2htlsPQfyHZZMmAbPV-Ml9UA.webp" }} />
            </StyledProfileContainer>

            <StyledRanking>
                <LineChart
                data={msgCnt}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}/>
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


const StyledProfileContainer = Styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const StyledProfileImage = Styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
    margin-left: 10px;
`;

const StyledProfileText = Styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
`;


const StyledRanking = Styled.View`
    width: 400px;
    height: 200px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;`;


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