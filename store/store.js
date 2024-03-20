import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import messageSlice from "./messageSlice";


export const store = configureStore({
    reducer:{
        auth: authSlice,
        users: userSlice,
        chats: chatSlice,
        messages: messageSlice
    }
})