import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Join from './Join';

const Stack = createStackNavigator();

function AuthStack({navigation}) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} navigation={navigation}/>
            <Stack.Screen name="Join" component={Join} />
        </Stack.Navigator>
    );
}

export default AuthStack;