import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PageContainer from '../components/PageContainer'
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'
import colors from '../constants/colors'
import SigninWithGoogle from '../components/SigninWithGoogle'

const AuthScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const switchText = () => {
        setIsSignUp(prev => !prev);
    }
    return (
        <PageContainer>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : undefined} keyboardVerticalOffset={100}>
                <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} resizeMode='contain' source={require("../assets/images/logo.png")} />
                    </View>
                    {
                        isSignUp ? <SignUpForm /> : <SignInForm />
                    }
                  
                    <TouchableOpacity onPress={switchText} style={styles.switchContainer}>
                        <Text style={styles.link}>Switch to {isSignUp ? "Sign In" : "Sign Up"}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    switchContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    link: {
        color: colors.secondary
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: "50%"
    },
  
})

export default AuthScreen

