import React, { useState, useEffect } from "react";
import { Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import Styled from 'styled-components';
import ConversationList from "../../components/ConversationList";
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

function ChatList(){
    const { height, width } = Dimensions.get('window');
    const flatListHeight = height * 0.58;
    const navigation = useNavigation(); 
    const [chatListData, setChatListData] = useState([]);
    const [token, setToken] = useState(null);

    const startNewChat = () => {
        navigation.navigate("Chat", { newChat: true });
    };

    const showChatHistory = ( chatId, subject, summary ) => {
        navigation.navigate('ChatHistory', { chatId, subject, summary });
    };

    const fetchChatList = async () => {
        try {
            const realToken = await AsyncStorage.getItem('userToken');
            if (!realToken) {
                console.log('토큰이 없습니다!');
                return;
            }
        
            console.log('토큰:', realToken);
        
            const headers = {
                'Authorization': `Bearer ${realToken}`, // 상태 대신 직접 사용
            };
        
            const response = await fetch('http://10.0.2.2:8080/api/chatList', {
                method: 'GET',
                headers: headers,
            });
        
            let data;
            if (response.status === 200) {
                data = await response.json();
                console.log('데이터 가져오기 성공:', data);
                setChatListData(data); // 데이터 상태 업데이트
            } else {
                console.log('오류 발생:', response.status, response.statusText);
            }
            console.log('data는', data);
        }catch (error) {
            console.error("Error fetching chat list:", error);
        }
    };
    
    useFocusEffect(
        React.useCallback(() => {
            // 화면이 포커스를 받을 때마다 데이터를 가져옴
            fetchChatList();
        }, []) // 의존성 없음 -> 매번 새로 실행
    );

    return (
        <>
            <StyledView>
                <StyledConversations>Conversations</StyledConversations>
                    <StyledFlatList
                        data={chatListData} // chatListData를 데이터로 사용
                        keyExtractor={(chat) => chat.chatId.toString()} // 각 아이템의 고유한 key
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => showChatHistory(item.chatId, item.summary, item.summary)}>
                                <React.Fragment>
                                    <ConversationList chat={item} />
                                    {index < chatListData.length - 1 && <StyledConversationLine />}
                                </React.Fragment>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={{ paddingBottom: 24 }}
                        dynamicHeight={flatListHeight}
                    />
                <StyledAddButton>
                    <TouchableOpacity onPress={startNewChat}>
                    <Image source={require('../../assets/images/addButton.png')} />
                    </TouchableOpacity> 
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
    padding-top: 15px;
    padding-left: 32px;
    position: relative;
    font-family: 'Pretendard-Medium';
    font-style: normal;
    font-weight: 400px;
    font-size: 20px;
    line-height: 20px;
    color: #000000;
`;

const StyledFlatList = Styled(FlatList)`
    margin: 13px 20px 10px 20px;
    padding: 14px 18px;
    position: relative;
    border-width: 1px;
    border-radius: 10px;
    border-color: #B9B7B7;
    width: 90%;
    flex-grow: 1;
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