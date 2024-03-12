import React, { useCallback, useReducer } from 'react'
import Input from './Input'
import Button from './Button'
import { Feather } from '@expo/vector-icons'
import { validateInputs } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'


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

    const onChangedText = useCallback((id, value) => {
        let result = validateInputs(id, value);
        dispatchFormState({ id, validationResult: result,value });
    }, [dispatchFormState])

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
            <Button disabled={!formState.formIsValid} title="Sign in" />
        </>

    )
}

export default SignInForm