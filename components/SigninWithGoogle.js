import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { googleSignIn } from '../utils/actions/authActions'

//web:956696843327-s344fglob74psg1dipuqp3i4vu1c8koc.apps.googleusercontent.com
//ios:956696843327-23ve6015463jbhasq7mhhsqfi254mhhi.apps.googleusercontent.com
//android:956696843327-lnmk0ne79cjdh940cc7h418dfg5leplr.apps.googleusercontent.com

const SigninWithGoogle = () => {
    // useEffect(() => {
    //     GoogleSignin.configure();
    // },[])
    const signIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <GoogleSigninButton size={GoogleSigninButton.Size.Wide} onPress={signIn} />

    )
}

const styles = StyleSheet.create({})

export default SigninWithGoogle

