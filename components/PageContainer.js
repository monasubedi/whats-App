import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const PageContainer = (props) => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: colors.white
    }
})

export default PageContainer