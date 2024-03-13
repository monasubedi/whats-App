import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import ChatScreen from '../screens/ChatScreen';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={TabNavigator} options={{ headerTitle: '' }} />
            <Stack.Screen name='ChatSettings' component={ChatSettingsScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} options={{headerBackTitle:'Back', headerTitle:''}} />
        </Stack.Navigator>
    )
}


const styles = StyleSheet.create({})

export default MainNavigator
