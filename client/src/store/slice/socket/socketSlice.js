import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      const socket = io(import.meta.env.VITE_DB_ORIGIN ,{   //It creates a new socket connection to your backend server using an environment variable (VITE_DB_ORIGIN).
        query: {
            userId : action.payload,
        }
      }); 
      state.socket = socket;  //Then it stores the socket object in Redux state, so your app can use it later.

      },

      setOnlineUsers: (state, action) => {
        state.onlineUsers = action.payload;
      }
    },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;




/*
✅ Why Create a Slice for Socket?
In Redux, a slice is a way to organize part of your global app state and logic together.
Here, you are managing socket connection and related real-time data (like online users) using Redux.

Creating a socketSlice allows you to:
Keep the socket connection available across your app.
Control the socket lifecycle (e.g., when to connect).
Access the socket instance from anywhere using Redux state.
Manage related data like onlineUsers (people currently online).



✅ Summary 
You made a Redux slice to manage the socket connection in a clean and centralized way.
When initializeSocket() is called, it connects to your backend via Socket.IO and saves that connection in your Redux state.
Later, you can access or use this socket anywhere in your app by reading it from the Redux store.
*/