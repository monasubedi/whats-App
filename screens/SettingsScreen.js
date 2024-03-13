import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import PageTitle from '../components/PageTitle'
import PageContainer from '../components/PageContainer'
import Input from '../components/Input'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { reducer } from '../utils/reducers/formReducer'
import { validateInputs } from '../utils/actions/formActions'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors'
import Button from '../components/Button'
import { updateSignedInData, userLogout } from '../utils/actions/authActions'
import { updateLoggedInUserData } from '../store/authSlice'

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    about: ""
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    about: false
  },
  formIsValid: false
}

const SettingsScreen = () => {
  const userData = useSelector(state => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const initialState = {
    inputValues: {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      about: userData.about || ""
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined
    },
    formIsValid: false
  }

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();


  const onChangedText = useCallback((id, value) => {
    let result = validateInputs(id, value);
    dispatchFormState({ id, validationResult: result, value });
  }, [dispatchFormState])

  const saveHandler = async () => {
    setIsLoading(true);
    console.log(formState.inputValues);
    try {
      await updateSignedInData(userData.userId, formState.inputValues);
      dispatch(updateLoggedInUserData(formState.inputValues));
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);

    } catch (error) {

    }
    finally {
      setIsLoading(false);
    }
  }

  const logout = () => {
    dispatch(userLogout());
  }

  return (
    <PageContainer style={styles.container}>
      <PageTitle title="Settings" />
      <Input
        id="firstName"
        label={"First Name"}
        name="user-o"
        iconSize={24}
        errorText={formState.inputValidities["firstName"]}
        iconPack={FontAwesome}
        autoCapitalize="none"
        autoCorrect={false}
        initialValue={userData.firstName}
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
        initialValue={userData.lastName}
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
        initialValue={userData.email}
        handleChangeText={onChangedText}

      />
      <Input
        id="about"
        label={"About"}
        name="user-o"
        iconSize={24}
        errorText={formState.inputValidities["about"]}
        iconPack={FontAwesome}
        autoCapitalize="none"
        autoCorrect={false}
        initialValue={userData.about}
        handleChangeText={onChangedText}

      />
      {
        showSuccessMsg && <Text>Saved!</Text>
      }

      {
        isLoading ?
          <ActivityIndicator style={{ marginTop: 20 }} color={colors.primary} size={'small'} /> :
          <Button disabled={!formState.formIsValid} title="Save" onPress={saveHandler} />
      }
      <Button title="Logout" style={{ marginTop: 20 }} color={colors.red} onPress={logout} />
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default SettingsScreen;

