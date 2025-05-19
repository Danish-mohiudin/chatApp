import mongoose from "mongoose";

const userSchema = new mongoose.Schema({              // schema for user collection
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
},{ timestamps: true }
);

const User = mongoose.model("User",userSchema);  // model
export default User;