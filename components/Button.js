import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const Button = (props) => {
    const enabledBgColor = props.color || colors.primary;
    const disabledBgColor = colors.lightGrey;
    const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

    return (
        <TouchableOpacity onPress={props.onPress} style={{ ...styles.button, ...props.style, ...{ backgroundColor: bgColor } }}>
            <Text
                style={{ color: props.disabled ? colors.grey : colors.white, fontSize: 17 }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Button

