import React from "react";
import { Text } from 'react-native';
import Styled from 'styled-components';

const StyledView = Styled.View`
    flex: 1;
    justifyContent: 'center';
    alignItems: 'center';
`;

function Home(){
    return (
        <>
            <StyledView>
                <Text>홈 화면</Text>
            </StyledView>
        </>
    );
}

export default Home;