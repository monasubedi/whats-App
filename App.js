import "react-native-gesture-handler";

import { LogBox, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import AppNavigator from "./navigators/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreAllLogs('You are initializing Firebase Auth for React Native')

SplashScreen.preventAutoHideAsync();
// AsyncStorage.clear();

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const prepareFonts = async () => {
      try {
        await Font.loadAsync({
          "black": require("./assets/fonts/Roboto-Black.ttf"),
          "black-italic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
          "bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "bold-italic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
          "italic": require("./assets/fonts/Roboto-Italic.ttf"),
          "light": require("./assets/fonts/Roboto-Light.ttf"),
          "light-italic": require("./assets/fonts/Roboto-LightItalic.ttf"),
          "medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "medium-italic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
          "regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "thin": require("./assets/fonts/Roboto-Thin.ttf"),
          "thin-italic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
        setIsAppLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
    prepareFonts();
  }, [])

  const onLayout = useCallback(async () => {
    if (isAppLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isAppLoaded])

  if (!isAppLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container} onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
