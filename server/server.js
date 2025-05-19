import express from 'express';
const app = express()

const PORT = 5000;

// routes 

import userRoute from './routes/userRoute.js'

app.use('/api/v1/user', userRoute)

app.listen(PORT, ()=>{
    console.log(`your server lisening at port ${PORT}`);
})
    
