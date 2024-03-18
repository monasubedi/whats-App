import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import ProfileImage from './ProfileImage'
import colors from '../constants/colors'

const DataItem = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.container}>
                <View>
                    <ProfileImage uri={props.image} size={40} showEditButton={false} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                    <Text style={styles.subtitle} numberOfLines={1}>{props.subTitle}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: colors.extraLightGrey,
        borderBottomWidth: 1,
        paddingVertical: 7,
        minHeight: 50,
        alignItems: 'center'
    },
    textContainer: {
        marginLeft: 14
    },
    title: {
        fontFamily: 'medium',
        fontSize: 16,
        letterSpacing: 0.3
    },
    subtitle: {
        fontFamily: 'regular',
        color: colors.grey,
        letterSpacing: 0.3
    }
})

export default DataItem

