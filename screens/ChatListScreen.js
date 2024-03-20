import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import { useSelector } from 'react-redux'
import DataItem from '../components/DataItem'
import PageContainer from '../components/PageContainer'

const ChatListScreen = ({ navigation, route }) => {
    const userId = route.params?.selectedUserId;
    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    const usersChat = useSelector(state => {
        let chatsData = state.chats.chatsData;
        return Object.values(chatsData).sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    });

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
        let chatUsers = [userId, userData.userId];
        let navigationProps = {
            newChatData: { users: chatUsers }
        }
        navigation.push("Chat", navigationProps);
    }, [route.params])


    return (
        <PageContainer>
            <FlatList data={usersChat} renderItem={({ item }) => {
                let otherUserId = item.users.find(uid => uid !== userData.userId);
                let otherUserData = storedUsers[otherUserId];
                if (!otherUserData) {
                    return;
                }
                let title = `${otherUserData.firstName} ${otherUserData.lastName}`;
                let subTitle = item.latestMessageText || "New Chat";
                let image = otherUserData.profilePicture;

                return <DataItem title={title} subTitle={subTitle} image={image} onPress={() => navigation.navigate("Chat", { chatId: item.key })} />
            }} />
        </PageContainer>
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

