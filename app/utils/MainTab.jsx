import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Setting from '../screens/setting/Setting';
import Chat from '../screens/chat/Chat';
import ChatList from '../screens/chatlist/ChatList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: '#3B3838',
                    height: 50,
                    borderTopWidth: 0,
                    elevation: 5,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                },
            }}
        >
            <Tab.Screen name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={focused ? require('../assets/images/maintab/homeclick.png') : require('../assets/images/maintab/home.png')}  
                            style={{ width: 30, height: 30 }} 
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen name="Chat"
                component={Chat}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={focused ? require('../assets/images/maintab/chatclick.png') : require('../assets/images/maintab/chat.png')}  
                            style={{ width: 30, height: 30 }} 
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen name="ChatList"
                component={ChatList}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={focused ? require('../assets/images/maintab/chatlistclick.png') : require('../assets/images/maintab/chatlist.png')}  
                            style={{ width: 30, height: 30 }} 
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen name="Setting"
                component={Setting} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={focused ? require('../assets/images/maintab/settingclick.png') : require('../assets/images/maintab/setting.png')}  
                            style={{ width: 30, height: 30 }} 
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
        </Tab.Navigator>
    );
}