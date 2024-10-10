import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Setting from '../screens/setting/Setting';
import Chat from '../screens/chat/Chat';
import ChatList from '../screens/chatlist/ChatList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Chat" component={Chat}/>
            <Tab.Screen name="ChatList" component={ChatList}/>
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
}