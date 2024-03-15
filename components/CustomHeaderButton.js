import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors';

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton IconComponent={Ionicons} iconSize={23} color={props.color ?? colors.secondary} {...props} />
    )
}

export default CustomHeaderButton

const styles = StyleSheet.create({})