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
import messageRoute from './routes/messageRoute.js'
app.use('/api/v1/user', userRoute); // Every route in userRoute.js will be prefixed with /api/v1/user
app.use('/api/v1/message', messageRoute); // Every route in messageRoute.js will be prefixed with /api/v1/message

// middlewares 
import { errorMiddleware } from './middlewares/errorMiddleware.js'
app.use(errorMiddleware);

server.listen(PORT, ()=>{
    console.log(`$erver is running on port ${PORT}`)
});