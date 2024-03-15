import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (

        <Stack.Navigator >
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={TabNavigator} options={{ headerTitle: '' }} />
                <Stack.Screen name='ChatSettings' component={ChatSettingsScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} options={{ headerBackTitle: 'Back', headerTitle: '' }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
                <Stack.Screen name='New Chat' component={NewChatScreen} />
            </Stack.Group>

        </Stack.Navigator>
    )
}


const styles = StyleSheet.create({})

export default MainNavigator
