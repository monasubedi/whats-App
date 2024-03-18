import { getFirebaseApp } from "../firebaseHelper"
import { child, getDatabase, push, ref } from "firebase/database";

export const createChat = async (loggedInUserId, chatData) => {
    const newChatData = {
        ...chatData,
        createdBy: loggedInUserId,
        updatedBy: loggedInUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const newChat = await push(child(dbRef, 'chats'), newChatData);
    const chatUsers = newChatData.users;
    for (let i = 0; i < chatUsers.length; i++) {
        let userId = chatUsers[i];
        await push(child(dbRef, `chatUsers/${userId}`), newChat.key);
    }
    return newChat.key;
}