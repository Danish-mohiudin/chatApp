import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({ //to define what each message document in MongoDB will look like.A schema defines the structure and data types for a document in a MongoDB collection (in this case, for a message).
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
