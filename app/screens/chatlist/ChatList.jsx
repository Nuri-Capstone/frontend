import React, { useState, useEffect } from "react";
import { Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import Styled from 'styled-components';
import ConversationList from "../../components/ConversationList";
import { useNavigation } from '@react-navigation/native'; 


function ChatList(){
    const { height, width } = Dimensions.get('window');
    const flatListHeight = height * 0.58;
    const navigation = useNavigation(); 
    const [chatListData, setChatListData] = useState([]);

    const startNewChat = () => {
        navigation.navigate('Chat');
    };

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const response = await fetch('http://10.0.2.2:8080/api/chatList');
                const data = await response.json();
                console.log('data는', data);
                setChatListData(data);
            } catch (error) {
                console.error("Error fetching chat list:", error);
            }
        };
        fetchChatList();
    }, []);

    return (
        <>
            <StyledView>
                <StyledConversations>Conversations</StyledConversations>
                    <StyledFlatList
                        data={chatListData} // chatListData를 데이터로 사용
                        keyExtractor={(chat) => chat.chatId.toString()} // 각 아이템의 고유한 key
                        renderItem={({ item, index }) => (
                            <React.Fragment>
                                <ConversationList chat={item} />
                                {index < chatListData.length - 1 && <StyledConversationLine />}
                            </React.Fragment>
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