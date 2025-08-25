import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user/userSlice'
import messageReducer from './slice/message/messageSlice'
import socketReducer from './slice/socket/socketSlice'
import loaderReducer from "./slice/loader/loaderSlice";

export const store = configureStore({
    reducer:{
        userReducer,
        messageReducer,
        socketReducer,
        loaderReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths : ["socketReducer.socket"],
            }
        })
});