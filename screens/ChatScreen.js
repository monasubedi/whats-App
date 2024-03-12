import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import bgImg from "../assets/images/droplet.jpeg";
import React, { useCallback, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import colors from '../constants/colors';

const ChatScreen = () => {
  const [textMessage, setTextMessage] = useState('');

  const sendMessage = useCallback(() => {
    setTextMessage('');
  }, [textMessage])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <ImageBackground style={styles.container} source={bgImg}>

        </ImageBackground>
        <View style={styles.bottomContainer}>
          <TouchableOpacity>
            <Feather name='plus' size={25} color={colors.secondary} />
          </TouchableOpacity>
          <TextInput onSubmitEditing={sendMessage} value={textMessage} style={styles.input} onChangeText={(text) => setTextMessage(text)} placeholder='Send your message' />
          {
            textMessage === "" ? <TouchableOpacity>
              <Feather name='camera' size={25} color={colors.secondary} />
            </TouchableOpacity> :
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                <Feather name='send' size={20} color={colors.white} />
              </TouchableOpacity>
          }

        </View>
      </View>
    </KeyboardAvoidingView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    borderColor: colors.lightGrey,
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 17
  },
  sendBtn: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 50
  }
});

export default ChatScreen;

