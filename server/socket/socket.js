import dotenv from 'dotenv';
dotenv.config();

import {Server} from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: { 
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
    }
});

const userSocketMap = {
    // userId : socketId,
}

io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    if(!userId) return;
    
    userSocketMap[userId] = socket.id; // setting key inside userSocketMap with userId as key and socket.id as value

    io.emit('onlineUsers',Object.keys(userSocketMap)); // broadcasting online users to all clients
   
    socket.on('disconnect',()=>{
        delete userSocketMap[userId];
        io.emit('onlineUsers',Object.keys(userSocketMap));
    });    
});

const getSocketId = (userId) => {
    return userSocketMap[userId];
}


export {io, server, app , getSocketId}