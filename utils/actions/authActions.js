import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { child, getDatabase, ref, set } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";
import { authenticate } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "./userActions";
import { useCallback } from "react";

export const signUp = (firstName, lastName, email, password) => {
    return async dispatch => {
        try {
            const app = getFirebaseApp();
            const auth = getAuth(app);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = expirationTime;
            const userData = await createUser(firstName, lastName, email, uid);
            dispatch(authenticate({ token: accessToken, userData }));
            saveToStorage(accessToken, uid, expiryDate);


        } catch (error) {
            const errorCode = error.code;
            let message = "Something went wrong.";
            if (errorCode === "auth/email-already-in-use") {
                message = "This email is already in use";
            }
            throw new Error(message);
        }
    }

}

export const signIn = (email, password) => {
    return async dispatch => {
        try {
            const app = getFirebaseApp();
            const auth = getAuth(app);
            const result = await signInWithEmailAndPassword(email, password);
            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = expirationTime;
            const userData = await getUserData(uid);
            dispatch(authenticate({ token: accessToken, userData }));
            saveToStorage(accessToken, uid, expiryDate);


        } catch (error) {
            const errorCode = error.code;
            let message = "Something went wrong.";
            if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                message = "The username or password was incorrect";
            }
            throw new Error(message);
        }
    }

}

export const createUser = async (firstName, lastName, email, userId) => {
    let firstLast = `${firstName} ${lastName}`.toLowerCase();
    const userData = {
        firstName,
        lastName,
        email,
        firstLast,
        userId,
        signUpDate: new Date().toISOString()
    }
    try {
        const dbRef = ref(getDatabase());
        const childRef = child(dbRef, `users/${userId}`)

        await set(childRef, userData);
        return userData;

    } catch (error) {
        console.log("error", error);
    }

}


const saveToStorage = async (token, userId, expiryDate) => {
    try {
        await AsyncStorage.setItem("userData", JSON.stringify({
            token,
            userId,
            expiryDate: new Date(expiryDate).toISOString()
        }));
    } catch (error) {
        console.log(error);
    }


}