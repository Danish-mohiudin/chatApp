import { createSlice } from "@reduxjs/toolkit";
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
        },
      }); 
      state.socket = socket;  //Then it stores the socket object in Redux state, so your app can use it later.

      },

      setOnlineUsers: (state, action) => {
        state.onlineUsers = action.payload;
      },
    },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;