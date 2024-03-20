import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "chats",
    initialState: {
        messagesData: {}
    },
    reducers: {
        setChatMessages: (state, action) => {
            const existingMessages = state.messagesData;
            const { chatId, messagesData } = action.payload;
            existingMessages[chatId] = messagesData;

            state.messagesData = existingMessages;
        }
    }
})

export const { setChatMessages } = messageSlice.actions;

export default messageSlice.reducer;