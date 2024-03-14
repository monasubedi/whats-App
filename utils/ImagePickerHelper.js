import { Platform } from "react-native"
import * as ImagePicker from "expo-image-picker"
import uuid from "react-native-uuid"
import { ref, getStorage, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getFirebaseApp } from "./firebaseHelper";


export const launchImagePicker = async () => {
    await requestPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
    })
    if (!result.canceled) {
        return result.assets[0].uri;
    }
}

export const uploadImageAsync = async (uri) => {
    const app = getFirebaseApp();
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        }
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        }
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send();
    })
    const pathFolder = 'profilePics';
    const fileRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);
    await uploadBytesResumable(fileRef,blob)
    blob.close();
    return await getDownloadURL(fileRef);
}

const requestPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            return Promise.reject("Access to the media is not granted ")
        }
    }
    return Promise.resolve();
}