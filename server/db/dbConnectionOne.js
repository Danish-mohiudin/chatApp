import mongoose from "mongoose";
export const connectDb = async ()=>{
    try {
        const  MONGODB_URL = process.env.MONGODB_URL
        const instance = await mongoose.connect(MONGODB_URL);
        console.log(`mongoDB connected : ${instance.connection.host}`);
        
    } catch (error) {
        console.log(error);
        
    }
}