import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text,Button } from 'react-native';
import Styled from 'styled-components';

const StyledView = Styled.View`
    flex: 1;
    justifyContent: 'center';
    alignItems: 'center';
`;

function Setting({navigation}){
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.replace('Login');
    };
    return (
        <>
            <StyledView>
                <Text>설정 화면</Text>
                <Button title="로그아웃" onPress={handleLogout} />
            </StyledView>
        </>
    );
}

export default Setting;