import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigator'
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = () => {
    const isAuth = useSelector(state => state.auth.token !== null && state.auth.token !== "");
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    console.log(didTryAutoLogin);
    return (
        <NavigationContainer>
            {isAuth && <MainNavigator />}
            {!isAuth && didTryAutoLogin && <AuthScreen />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator

