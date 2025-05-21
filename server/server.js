import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoute from './routes/userRoute.js'
import { connectDb } from './db/dbConnectionOne.js'
connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// routes
app.use('/api/user', userRoute);

// middlewares 
import { errorMiddleware } from './middlewares/errorMiddleware.js'
app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`$erver is running on port ${PORT}`)
});