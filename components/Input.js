import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const Input = (props) => {
    const handleInputChange = (text) => {
        props.handleChangeText(props.id, text)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputContainer}>
                {
                    props.name &&
                    <props.iconPack style={styles.icon} name={props.name} size={props.iconSize || 15} />
                }

                <TextInput onChangeText={handleInputChange} style={styles.input} {...props} />
            </View>
            {
                props.errorText &&
                <View>
                    <Text style={styles.errorText}>{props.errorText[0]}</Text>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: colors.nearlyWhite,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: colors.grey
    },
    label: {
        fontFamily: 'bold',
        letterSpacing: 0.3,
        color: colors.textColor,
        marginVertical: 7
    },
    input: {
        fontFamily: 'regular',
        letterSpacing: 0.3,
        flex: 1,
        color: colors.textColor,
        paddingTop: 0,
        paddingLeft: 8,
        fontSize: 17
    },
    errorText: {
        color: colors.red,
        letterSpacing: 0.3,
        fontFamily: 'regular',
        marginTop: 5
    }
})

export default Input

