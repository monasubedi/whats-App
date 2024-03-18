import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import { useSelector } from 'react-redux'

const ChatListScreen = ({ navigation, route }) => {
    const userId = route.params?.selectedUserId;
    const userData = useSelector(state => state.auth.userData);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='New chat' iconName='create-outline' onPress={() => navigation.navigate("New Chat")} />
                </HeaderButtons>
            }
        })
    }, [])

    useEffect(() => {
        if (!userId) {
            return;
        }
        let chatUsers = [userId,userData.userId];
        let navigationProps = {
            newChatData: { users: chatUsers }
        }
        navigation.push("Chat", navigationProps);
    }, [route.params])

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

