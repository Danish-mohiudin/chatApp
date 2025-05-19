import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDb } from './db/dbConnectionOne.js';
connectDb();
const app = express();

const PORT = process.env.PORT || 5000;

// routes 

import userRoute from './routes/userRoute.js'
app.use('/user', userRoute)   // This line mounts the entire router userRoute at the path /api/v1/user, or we can say that it is creating the actual route

app.listen(PORT, ()=>{
    console.log(`your server lisening at port ${PORT}`);
})
    
