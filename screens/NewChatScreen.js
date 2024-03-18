import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import { FontAwesome } from '@expo/vector-icons'
import PageContainer from '../components/PageContainer'
import colors from '../constants/colors'
import commonStyles from '../constants/commonStyles';
import { searchUsers } from '../utils/actions/userActions'
import DataItem from '../components/DataItem'
import { useDispatch, useSelector } from 'react-redux'
import { setStoredUsers } from '../store/userSlice'

const NewChatScreen = ({ navigation,route }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState();
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        let delayTime = setTimeout(async () => {
            if (!searchTerm || searchTerm === '') {
                setUsers();
                setNoResultsFound(false);
                return;
            }
            setIsLoading(true);
            let userList = await searchUsers(searchTerm);
            delete(userList[userData.userId]);
            setUsers(userList);
            if (Object.keys(userList).length === 0) {
                setNoResultsFound(true);
            }
            else {
                setNoResultsFound(false);
                dispatch(setStoredUsers(userList));
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(delayTime);

    }, [searchTerm])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Close' onPress={() => navigation.goBack()} />
                </HeaderButtons>
            }
        })
    }, [])

    const onPressed = (userId) => {
        navigation.navigate("ChatList",{selectedUserId:userId});
    }

    return (
        <PageContainer>
            <View style={styles.searchContainer}>
                <FontAwesome name='search' size={16} color={colors.grey} />
                <TextInput placeholder='Search for users' onChangeText={(text) => setSearchTerm(text)} style={styles.searchInput} />
            </View>
            {
                isLoading &&

                <ActivityIndicator style={commonStyles.center} color={colors.secondary} size={'small'} />
            }
            {
                !isLoading && !noResultsFound && users &&
                <FlatList data={Object.keys(users)} renderItem={({ item }) => {
                    let userData = users[item];
                    return (
                        <DataItem title={userData.firstLast} onPress={() => onPressed(userData.userId)} subTitle={userData.about} image={userData.profilePicture} />
                    )
                }} />
            }

            {
                !isLoading && noResultsFound &&
                <View style={commonStyles.center}>
                    <FontAwesome name='question' size={55} color={colors.lightGrey} />
                    <Text style={styles.noResult}>No users found</Text>
                </View>
            }
            {
                !isLoading && !users &&
                <View style={commonStyles.center}>
                    <FontAwesome name='users' size={55} color={colors.lightGrey} />
                    <Text style={styles.noResult}>Enter a name to search for a user!</Text>
                </View>
            }

        </PageContainer>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: colors.extraLightGrey,
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    searchInput: {
        marginLeft: 8,
        fontSize: 15,
        width: '100%'
    },
    noResult: {
        marginTop: 12,
        fontSize: 16,
        color: colors.grey,
        letterSpacing: 0.5
    }
})

export default NewChatScreen

