import React from "react";
import { Text } from 'react-native';
import Styled from 'styled-components';

const StyledView = Styled.View`
    flex: 1;
    justifyContent: 'center';
    alignItems: 'center';
`;

function ChatList(){
    return (
        <>
            <StyledView>
                <Text>채팅 리스트 화면</Text>
            </StyledView>
        </>
    );
}

export default ChatList;