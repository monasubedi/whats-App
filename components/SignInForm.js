import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { Feather } from '@expo/vector-icons'
import { validateInputs } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'
import { signIn } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
import { ActivityIndicator, Alert } from 'react-native'
import colors from '../constants/colors'


const initialState = {
    inputValues: {
        email: "",
        password: ""
    },
    inputValidities: {
        email: false,
        password: false
    },
    formIsValid: false
}

const SignInForm = () => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState('');
    const dispatch = useDispatch();

    const onChangedText = useCallback((id, value) => {
        let result = validateInputs(id, value);
        dispatchFormState({ id, validationResult: result, value });
    }, [dispatchFormState])

    const signInUser = useCallback(async() => {
        const { email, password } = formState.inputValues;
        setIsLoading(true);
        try {
            await dispatch(signIn(email, password));
            setError('');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    },[dispatch,formState])

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured", error);
        }
    }, [error])

    return (
        <>
            <Input
                id="email"
                label={"Email"}
                name="mail"
                iconSize={24}
                errorText=""
                iconPack={Feather}
                autoCapitalize="none"
                keyboardType="email-address"
                handleChangeText={onChangedText}
            />
            <Input
                id="password"
                label={"Password"}
                name="lock"
                iconSize={24}
                errorText=""
                iconPack={Feather}
                autoCapitalize="none"
                secureTextEntry={true}
                handleChangeText={onChangedText}
            />
            {
                isLoading ? <ActivityIndicator style={{paddingTop:6}} size={'small'} color={colors.primary} /> : <Button disabled={!formState.formIsValid} onPress={signInUser} title="Sign in" />
            }

        </>

    )
}

export default SignInForm