import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';

const Stack = createStackNavigator();

function AuthStack({navigation}) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} navigation={navigation}/>
            <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
    );
}

export default AuthStack;