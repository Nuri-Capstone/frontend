import React,{Fragment} from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Styled from 'styled-components';

const StyledView = Styled.View`
    marginTop: 32;
    paddingHorizontal: 24;
`;

const StyledText = Styled.Text`
    background-color: #FF9933;
    fontSize: 8;
`;

function Main(){
    return (
        <>
            <StyledView>
                <StyledText>This is a Main Page.</StyledText>
            </StyledView>
        </>
    );
}

export default Main;