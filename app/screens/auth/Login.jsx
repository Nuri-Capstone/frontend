import React from 'react';
import { View, Text, Button } from 'react-native';
import Styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = Styled.View`
    flex: 1;
    justifyContent: 'center';
    alignItems: 'center';
`;

function Login({ navigation }) {
    const handleLogin = async () => {
        await AsyncStorage.setItem('userToken', 'dummy-token');
        navigation.navigate('MainTab',{
            screen: 'Home',
        });
        console.log('눌림');
    };

    return (
        <StyledView>
            <Text>로그인 화면</Text>
            <Button title="로그인" onPress={handleLogin} />
            <Button title="회원가입으로 이동" onPress={() => navigation.navigate('Signup')} />
        </StyledView>
    );
}

export default Login;
