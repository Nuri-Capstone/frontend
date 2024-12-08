import React, { useState, useEffect } from "react";
import Styled, { keyframes } from 'styled-components';
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import {defaultFeedback} from "../../mock-data/monthlyFeedbackData";

import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useFocusEffect } from '@react-navigation/native'; 

function Home(){
    const [userRanking, setUserRanking] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState(12);
    const [currentFeedback, setCurrentFeedback] = useState(defaultFeedback);

    const [msgCnt, setMsgCnt] = useState({
        labels: [0],
        datasets: [
            {
                data: [0],
                color: () => `rgba(252, 235, 175, 1)`,
                strokeWidth: 1,
            },
        ],
        legend: ["대화 수 랭킹"]
    });

    const fetchRanking = async () => {
        const userId = 264;

        const allUserResponse = await fetch('http://10.0.2.2:8080/home/ranking/allUsers', {
            method: "GET",
            headers: {
                "Content-type" : "application/json",
                "Authorization" : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWFAYWFhLmFhYSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MzM3Mzg5Njl9.LxZDKEQvvwq_LweG4vVnsRaXt0E8utKG1k4rB2K5vd0`
            },
        });
        const allUserData = await allUserResponse.json();

        setTotalUsers(allUserData);

        const userRankingResponse = await fetch(`http://10.0.2.2:8080/home/ranking/${userId}`, {
            method: "GET",
            headers: {
                "Content-type" : "application/json",
                "Authorization" : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWFAYWFhLmFhYSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MzM3Mzg5Njl9.LxZDKEQvvwq_LweG4vVnsRaXt0E8utKG1k4rB2K5vd0`
            },
        });
        const userRankingData = await userRankingResponse.json();
        console.log("userRankingData" + userRankingData);

        setUserRanking(userRankingData);
    };

    const fetchData = async () => {
        try {
            const userId = 264;
            
            const response = await fetch(`http://10.0.2.2:8080/home/graph/${userId}`, {
                method: "GET",
                headers: {
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWFAYWFhLmFhYSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MzM3Mzg5Njl9.LxZDKEQvvwq_LweG4vVnsRaXt0E8utKG1k4rB2K5vd0`
                },
            });
            const data = await response.json();
    
            if (data && typeof data === "object") {
                const date = [];
                const numOfMessage = [0];

                Object.keys(data).forEach((key) => {
                    // 날짜를 '23/12/01' 형식으로 변환
                    const formattedDate = key
                        .slice(2) // '2023-12-01' -> '23-12-01'
                        .replace(/-/g, "/"); // '23-12-01' -> '23/12/01'
                    date.push(formattedDate); // 변환된 날짜 추가
                    numOfMessage.push(data[key]); // 메시지 개수 추가
    
                    console.log("formattedDate: " + formattedDate);
                    console.log("numOfMessage: " + data[key]);
                });
                
                setMsgCnt({
                    labels: date,
                    datasets: [
                        {
                            data: numOfMessage,
                            color: () => `rgba(252, 235, 175, 1)`,
                            strokeWidth: 1
                        }
                    ],
                    legend: ["월별 대화"]
                });

                console.log("msgCnt.date " + msgCnt.date);
                console.log("msgCnt.numOfMessage " + msgCnt.datasets[0].data);
                
            }
            else {
                console.error("올바르지 않은 데이터 형식:", data);
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
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
            const userId = 264;       // 이후 실제 userID로 넣어야 함
            console.log("userId: " + userId);
            console.log("month: " + month);
            const response = await fetch(`http://10.0.2.2:8080/home/monthlyFeedback/${userId}/${year}/${month}`, {
                method: "GET",
                headers: {
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWFAYWFhLmFhYSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MzM3Mzg5Njl9.LxZDKEQvvwq_LweG4vVnsRaXt0E8utKG1k4rB2K5vd0`
                },
            });

            console.log(response);
            const data = await response.json();
            console.log(data);

            const responseFeedback = [
                {title: "문법 피드백", content: data.grammar.content},
                {title: "어휘 피드백", content: data.vocabulary.content},
                {title: "경어체 피드백", content: data.formalInformal.content},
            ]

            setCurrentFeedback(responseFeedback);
        } catch (error) {
            console.error("데이터 가져오기 실패: ", error);
            setCurrentFeedback(defaultFeedback);
        }
    };

    useEffect(() => {
        fetchRanking();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchMonthlyFeedback(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    useFocusEffect(
        React.useCallback(() => {
            // 화면이 포커스를 받을 때마다 데이터를 가져옴
            fetchRanking();
            fetchData();
        }, []) // 의존성 없음 -> 매번 새로 실행
    );


    const screenWidth = Dimensions.get("window").width;


    return (
        <StyledView>
            
            <StyledProfileContainer>
                <StyledProfileText>사용자 님의 순위는 {userRanking}/{totalUsers} 위입니다!{"\n"}아주 잘하고 있어요!</StyledProfileText>
            </StyledProfileContainer>

            <StyledRanking>
            <ScrollView horizontal={true} style={{ flexDirection: "row"}}>
                <LineChart
                    
                    data={msgCnt}
                    width={Math.max(screenWidth, msgCnt.labels.length * 70)}
                    height={220}
                    
                    yAxisSuffix="개"
                    yAxisInterval={10}
                    yAxisMin={0} // y축의 최소값
                    yAxisMax={100}

                    chartConfig={{
                        backgroundGradientFrom: "white",
                        backgroundGradientFromOpacity: 1,
                        backgroundGradientTo: "white",
                        backgroundGradientToOpacity: 1,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        fromZero: true,
                        
                        strokeWidth: 3,
                        useShadowColorFromDataset: false,

                        color: (opacity = 1) => `rgba(100, 55, 55, ${opacity})`,
                    }}

                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}/>
                </ScrollView>
            
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
    flex: 1;
    min-height: 251px;
`;

const StyledFeedbackCard = Styled.View`
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin: 10px;
    
    justify-content: flex-start;
`;

const StyledSummaryTitle = Styled.Text`
    fontWeight: bold;
    margin-top: 20px;
`;

const StyledSummaryContent = Styled.Text`
    margin-top: 15px;
`;



export default Home;