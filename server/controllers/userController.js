// import { use } from 'react';
// import { response } from 'express';
import User from '../models/userModel.js'
import { asyncHandler } from '../utilities/asyncHandlerUtility.js';
import { errorHandler } from '../utilities/errorHandlerUtility.js'
import bcrypt from 'bcryptjs'

export const register = asyncHandler(async (req, res, next) => {
    const { fullName, username, password, gender} = req.body;
    
    if(!fullName || !username ||!password ||!gender) {
      return next(new errorHandler("All fields are required", 400))
    };

    const user = await User.findOne({username});
    if(user){
      return next(new errorHandler('User already exists', 400))
    }  


    const hashedPassword = await bcrypt.hash(password, 10);

    const profileType = gender === 'male'? 'boy' : 'girl';
    const profile = `https://avatar.iran.liara.run/public/${profileType}?username=${username}`

    const newUser = await User.create({ 
      fullName, 
      username, 
      password: hashedPassword, 
      gender,
      profile,
    });

    res.status(200).json({
      success: true,
      responseData :{
        newUser
      }
    })
    res.send('hello regester');
  })


export const login = asyncHandler(async (req, res, next) => {
    const { username, password} = req.body;
    
    if(!username ||!password) {
      return next(new errorHandler("Please Enter a valid username or password", 400))
    };

    const user = await User.findOne({username});
    if(!user){
      return next(new errorHandler('Please Enter a valid username or password', 400))
    }  


    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
      return next(new errorHandler('Please Enter a valid username or password', 400))
    }


    res.status(200).json({
      success: true,
      responseData :{
        user
      }
    })
  })



