import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user/userSlice'
import messageReducer from './slice/message/messageSlice'

export const store = configureStore({
    reducer:{
        userReducer,
        messageReducer,
    },
});