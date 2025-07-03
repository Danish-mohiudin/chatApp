import {server, app} from './socket/socket.js';
import express from 'express';
import coolieParser from 'cookie-parser';
import { connectDb } from './db/dbConnectionOne.js';
import cors from 'cors';

connectDb();

app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials: true,
}));
app.use(express.json());
app.use(coolieParser());
//app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// routes
import userRoute from './routes/userRoute.js'
app.use('/user', userRoute)   // This line mounts the entire router userRoute at the path /api/v1/user, or we can say that it is creating the actual route

app.listen(PORT, ()=>{
    console.log(`your server lisening at port ${PORT}`);
})
    
