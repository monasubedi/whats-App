import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import bgImg from "../assets/images/droplet.jpeg";
import React, { useCallback, useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import colors from '../constants/colors';
import { useSelector } from 'react-redux';
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Bubble from '../components/Bubble';
import PageContainer from '../components/PageContainer';
import { createChat } from '../utils/actions/chatActions';


const ChatScreen = ({ navigation, route }) => {
  const [textMessage, setTextMessage] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [chatId, setChatId] = useState(route?.params?.chatId);
  const chatData = route?.params?.newChatData;
  const storedUsers = useSelector(state => state.users.storedUsers);
  const userData = useSelector(state => state.auth.userData);

  const getChatTitle = () => {
    const otherUserId = chatUsers.find(uid => uid !== userData.userId);
    const otherUserData = storedUsers[otherUserId];
    return otherUserId && `${otherUserData.firstName} ${otherUserData.lastName}`;
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getChatTitle()
    });

    setChatUsers(chatData.users);
  }, [chatUsers])

  const sendMessage = useCallback(async() => {
    let id = chatId;
    if(!id){
      id = await createChat(userData.userId,chatData);
      setChatId(id);
    }
    setTextMessage('');
  }, [textMessage])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <ImageBackground style={styles.container} source={bgImg}>
          <PageContainer style={{backgroundColor:'transparent'}}>
            {!chatId && <Bubble type="system" text="This is a new chat. Say hi!" />}
          </PageContainer>
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

