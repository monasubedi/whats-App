import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const PageTitle = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    text: {
        fontSize: 28,
        color: colors.textColor,
        fontFamily: 'bold',
        letterSpacing: 0.3
    }
})

export default PageTitle

