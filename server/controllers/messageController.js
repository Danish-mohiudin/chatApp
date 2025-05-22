import Message from '../models/messageModel.js'
import Conversation from '../models/conversarionModel.js'
import { asyncHandler } from '../utilities/asyncHandlerUtility.js';
import { errorHandler } from '../utilities/errorHandlerUtility.js'

export const sendMessage = asyncHandler(async (req, res, next) => {
    const senderId = req.user._id;
    const recieverId = req.params.recieverId;
    const message = req.body.message;

    if(!senderId || !recieverId || !message) {
        return next(new errorHandler("Please provide valid message, receiverId and senderId", 400));
    }
    
    let conversation = await Conversation.findOne(
        { participants: { $all: [senderId, recieverId] } },  // $all means both senderId and receiverId should be present in the participants array
    );

    if(!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, recieverId],
        });
    }

    const newMessage = await Message.create({
        senderId,
        recieverId,
        message,
    });

    if(newMessage){
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    //socket.io broadcasting code here

    res
    .status(200)
    .json({
      success: true,
      responseData : newMessage,
    });
    res.send('hello regester');
  })

export const getMessages = asyncHandler(async (req, res, next) => {
    const myId = req.user._id;
    const otherParticipantId = req.params.recieverId;

    if(!myId || !otherParticipantId ) {
        return next(new errorHandler("Please provide valid message, receiverId and senderId", 400));
    }
    
    let conversation = await Conversation.findOne(
        { participants: { $all: [myId, otherParticipantId] } },  // $all means both senderId and receiverId should be present in the participants array
    ).populate('messages')
    

    res
    .status(200)
    .json({
      success: true,
      responseData : conversation,
    });
    res.send('hello regester');
  })
