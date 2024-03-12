import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { ActivityIndicator, Alert } from 'react-native'

import Input from './Input'
import Button from './Button'

import { validateInputs } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'
import { signUp } from '../utils/actions/authActions'

import colors from '../constants/colors'
import { useDispatch } from 'react-redux'



const initialState = {
    inputValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    },
    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false
    },
    formIsValid: false
}

const SignUpForm = () => {

    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured", error);
        }
    }, [error])

    const onChangedText = useCallback((id, value) => {
        let result = validateInputs(id, value);
        dispatchFormState({ id, validationResult: result, value });
    }, [dispatchFormState])

    const signUpUser = async () => {
        const { firstName, lastName, email, password } = formState.inputValues;
        setIsLoading(true);
        try {
            dispatch(signUp(firstName, lastName, email, password));
            setError('');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    return (
        <>
            <Input
                id="firstName"
                label={"First Name"}
                name="user-o"
                iconSize={24}
                errorText={formState.inputValidities["firstName"]}
                iconPack={FontAwesome}
                autoCapitalize="none"
                autoCorrect={false}
                handleChangeText={onChangedText}
            />
            <Input
                id="lastName"
                label={"Last Name"}
                name="user-o"
                iconSize={24}
                errorText={formState.inputValidities["lastName"]}
                iconPack={FontAwesome}
                autoCapitalize="none"
                autoCorrect={false}
                handleChangeText={onChangedText}

            />
            <Input
                id="email"
                label={"Email"}
                name="mail"
                iconSize={24}
                errorText={formState.inputValidities["email"]}
                iconPack={Feather}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                handleChangeText={onChangedText}

            />
            <Input
                id="password"
                label={"Password"}
                name="lock"
                iconSize={24}
                errorText={formState.inputValidities["password"]}
                iconPack={Feather}
                handleChangeText={onChangedText}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}

            />
            {
                isLoading ?
                    <ActivityIndicator style={{ marginTop: 20 }} color={colors.primary} size={'small'} /> : <Button disabled={!formState.formIsValid} title="Sign up" onPress={signUpUser} />
            }

        </>

    )
}

export default SignUpForm