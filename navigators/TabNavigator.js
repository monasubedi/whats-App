import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, Feather } from "@expo/vector-icons"
import ChatListScreen from '../screens/ChatListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerTitle: '', headerShadowVisible:false }}>
            <Tab.Screen name='ChatList' component={ChatListScreen} options={{
                tabBarLabel: "Chats",
                tabBarIcon: ({ color }) => {
                    return <Ionicons name="chatbubble-outline" size={24} color={color} />
                },
                tabBarLabelStyle: { fontSize: 14 }
            }} />
            <Tab.Screen name='Settings' component={SettingsScreen} options={{
                headerShadowVisible:false,
                headerTitle: '',
                tabBarIcon: ({ color }) => {
                    return <Feather name="settings" color={color} size={25} />
                },
                tabBarLabelStyle: { fontSize: 14 }
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigator