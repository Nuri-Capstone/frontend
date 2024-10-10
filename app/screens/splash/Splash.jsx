import React from 'react';
import { View, Text, Button } from 'react-native';
import Styled from 'styled-components';

const StyledView = Styled.View`
    flex: 1;
    justifyContent: 'center';
    alignItems: 'center';
`;

function Splash({ navigation }) {
    return (
        <StyledView>
            <Text>시작 화면</Text>
            <Button title="시작하기" onPress={() => navigation.navigate('AuthStack')} />
        </StyledView>
    );
}

export default Splash;