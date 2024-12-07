import React from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';
import Styled from 'styled-components';

const StyledView = Styled.ImageBackground`
    flex: 1;
    resize-mode: cover;
`;

const StyledContainers = Styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-65px, -65px);
    align-items: center;
`;

const StyledText = Styled.Text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 800;
    font-size: 64px;
    text-align: center;

    color: #000000;
`;

function Splash({ navigation }) {
    return (
        <StyledView
            source={require('../../assets/images/background.jpg')}
            >
            <StyledContainers>
                <StyledText>NURI</StyledText>
                <Button title="> 시작하기" onPress={() => navigation.navigate('AuthStack')} />
            </StyledContainers>
        </StyledView>
    );
}

export default Splash;