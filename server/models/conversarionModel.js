import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(//this will store the conversation details ie who is in the conversation and the messages exchanged 
    {
    participants:[ // storing in the form of array so that we can have multiple participants in a conversation
        {
         type: mongoose.Schema.Types.ObjectId,
         ref:"User",
        },
    ],
    messages: [ // storing messages in an array so that we can have multiple messages in a conversation
        {
         type: mongoose.Schema.Types.ObjectId,
         ref:"Message",
        },
    ],
},
{timeStamp:true}
);

export default mongoose.model("conversation",conversationSchema);