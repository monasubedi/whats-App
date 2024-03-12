import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChatListScreen = ({ navigation }) => {
    useEffect(() => {
        console.log(AsyncStorage.getItem("userData"));

    }, [])
    return (
        <View style={styles.container}>
            <Text>ChatListScreen</Text>
            <Button onPress={() => navigation.navigate("Chat")} title='Go to chat screen' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ChatListScreen

