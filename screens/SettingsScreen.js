import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native'
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
import ProfileImage from '../components/ProfileImage'


const SettingsScreen = () => {
  const userData = useSelector(state => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const email = userData.email || "";
  const about = userData.about || "";

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about
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

  const hasChanges = () => {
    const currentValues = formState.inputValues;
    return currentValues.firstName !== firstName || currentValues.lastName !== lastName
      || currentValues.email !== email || currentValues.about !== about
  }

  return (
    <PageContainer style={styles.container}>
      <PageTitle title="Settings" />
      <ScrollView contentContainerStyle={styles.formContainer}>

        <ProfileImage size={80} userId={userData.userId} uri={userData.profilePicture} />
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
            hasChanges() &&
            <Button disabled={!formState.formIsValid} title="Save" onPress={saveHandler} />
        }
        <Button title="Logout" style={{ marginTop: 20 }} color={colors.red} onPress={logout} />
      </ScrollView>

    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    alignItems: 'center',
  
  }
})

export default SettingsScreen;

