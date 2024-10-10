import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './screens/splash/Splash';
import AuthStack from './screens/auth/AuthStack';
import 'react-native-gesture-handler';
import MainTab from './utils/MainTab';

const Stack = createStackNavigator();

function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!token); // 토큰이 있으면 로그인 상태로 설정
      } catch (error) {
        console.error('Failed to fetch token', error);
      }
      setIsLoading(false); // 로딩 완료
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <Splash />; // 로딩 중일 때 스플래시 화면 표시
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash}/>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
