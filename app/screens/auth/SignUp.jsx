import React from 'react';
import { View, Text, Button } from 'react-native';
import Styled from 'styled-components';

const StyledView = Styled.View`
    flex: 1;
    justifyContent: 'center';
    alignItems: 'center';
`;

function SignUp({ navigation }) {

    return (
        <StyledView>
            <Text>회원가입 화면</Text>
            <Button title="회원가입 완료" onPress={() => navigation.replace('Login')} />
        </StyledView>
    );
}

export default SignUp;