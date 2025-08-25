import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // this field will store a MongoDB ObjectId (the unique ID Mongo gives each document).
        ref: 'User', // this tells Mongoose that the ObjectId belongs to the User model/collection, 👉 so this is how you link one collection to another (a relation).
        required: true,
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true, 
    }
},{timestamps: true})

export default mongoose.model('Message',messageSchema)
