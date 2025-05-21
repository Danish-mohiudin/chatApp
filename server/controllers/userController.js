// import { use } from 'react';
// import { response } from 'express';
import User from '../models/userModel.js'
import { asyncHandler } from '../utilities/asyncHandlerUtility.js';
import { errorHandler } from '../utilities/errorHandlerUtility.js'

export const register = asyncHandler(async (req, res, next) => {
    const { fullName, username, password, gender} = req.body;
    
    if(!fullName || !username ||!password ||!gender) {
      return next(new errorHandler("All fields are required", 400))
    };

    const user = await User.findOne({username});
    if(user){
      return next(new errorHandler('User already exists', 400))
    }  

    const newUser = await User.create({ 
      fullName, 
      username, 
      password, 
      gender,
    });

    res.status(200).json({
      success: true,
      responseData :{
        newUser
      }
    })
    res.send('hello regester');
  })

export const login = (req, res, next) => {
  res.send("hello i am login route 1");
};



