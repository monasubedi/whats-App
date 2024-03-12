// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const getFirebaseApp = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyA3M6VrVz9RFUdc3B0o7qtmQU11ioI3pcM",
        authDomain: "practiceapp-35a8d.firebaseapp.com",
        projectId: "practiceapp-35a8d",
        storageBucket: "practiceapp-35a8d.appspot.com",
        messagingSenderId: "956696843327",
        appId: "1:956696843327:web:9f3d8ff1dcbd41ab46548a",
        measurementId: "G-CLLYFWSHNM"
      };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return app;
}