import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import { getFirebaseApp } from '../utils/firebaseHelper';
import { child, get, getDatabase, off, onValue, ref } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { setChatsData } from '../store/chatSlice';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import { setStoredUsers } from '../store/userSlice';
import { setChatMessages } from '../store/messageSlice';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Subscribing to firebase listeners");
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userChatRef = child(dbRef, `chatUsers/${userData.userId}`);
        const refs = [userChatRef];
        onValue(userChatRef, (querySnapshot) => {
            const chatIdsData = querySnapshot.val() || {};
            const chatIds = Object.values(chatIdsData);
            const chatsData = {};
            let chatsFoundCount = 0;
            for (let i = 0; i < chatIds.length; i++) {
                const chatId = chatIds[i];
                const chatRef = child(dbRef, `chats/${chatId}`);
                refs.push(chatRef);
                onValue(chatRef, (chatSnapshot) => {
                    chatsFoundCount++;

                    const data = chatSnapshot.val();

                    data.users.forEach(id => {
                        if (storedUsers[id]) return;

                        const userRef = child(dbRef, `users/${id}`);
                        get(userRef).then(userSnapshot => {
                            const userSnapshotData = userSnapshot.val();
                            dispatch(setStoredUsers({ userSnapshotData }));
                        })
                        refs.push(userRef);
                    })

                    if (data) {
                        data.key = chatSnapshot.key;
                        chatsData[chatSnapshot.key] = data;
                    }
                    if (chatsFoundCount >= chatIds.length) {
                        dispatch(setChatsData({ chatsData }));
                        setIsLoading(false);
                    }
                    const messageRef = child(dbRef, `messages/${chatId}`);
                    refs.push(messageRef);

                    onValue(messageRef, (messageSnapshot) => {
                        const messagesData = messageSnapshot.val();
                        dispatch(setChatMessages({ chatId, messagesData }));
                    })

                    if (chatsFoundCount == 0) {
                        setIsLoading(false);
                    }
                });

            }
        })

        return () => {
            console.log('Unsubscribing to firebase listeners');
            refs.forEach(ref => off(ref));
        }
    }, [])

    return (
        isLoading ? <View style={commonStyles.center}>
            <ActivityIndicator size={'large'} color={colors.secondary} /></View > :
            <Stack.Navigator >
                <Stack.Group screenOptions={{}} >
                    <Stack.Screen name='Home' component={TabNavigator} options={{ headerTitle: '', headerShown: false }} />
                    <Stack.Screen name='ChatSettings' component={ChatSettingsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Chat' component={ChatScreen} options={{ headerBackTitle: 'Back', headerTitle: '' }} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
                    <Stack.Screen name='New Chat' component={NewChatScreen} />
                </Stack.Group>
            </Stack.Navigator>

    )
}

export default MainNavigator
