// import { use } from 'react';
// import { response } from 'express';
import User from '../models/userModel.js'
import { asyncHandler } from '../utilities/asyncHandlerUtility.js';
import { errorHandler } from '../utilities/errorHandlerUtility.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// /api/v1/user/register
export const register = asyncHandler(async (req, res, next) => { // will recieva data from registerUserThunk 
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
    const profile = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
    console.log("profilePicture before saving:", profile);

    const newUser = await User.create({ 
      username, 
      fullName, 
      password: hashedPassword, 
      gender,
      profile,
    });

    const tokenData = {
      _id: newUser?._id, // Optional chaining ensures no crash if newUser is undefined
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { 
      expiresIn: process.env.JWT_EXPIRES
    });

    res
    .status(200)
    .cookie("token",token, { 
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      ), // 2 days
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    })
    .json({
      success: true,
      responseData :{   // the response data is the object that gets sent to the frontend when a new user is successfully registered 
        newUser,
        token,
      },
    });
  });

// /api/v1/user/login
export const login = asyncHandler(async (req, res, next) => {
    const { username, password} = req.body;
    
    if(!username ||!password) {
      return next(new errorHandler("Please Enter a valid username or password", 400))
    };

    const user = await User.findOne({username}); // username:username
    if(!user){
      return next(new errorHandler('Please Enter a valid username or password', 400)
     );
    }  


    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
      return next(
        new errorHandler('Please Enter a valid username or password', 400))
    }

    const tokenData = {
      _id: user?._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { 
      expiresIn: process.env.JWT_EXPIRES
    });


    res
    .status(200)
    .cookie("token",token, { 
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      ), 
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      // domain: process.env.CLIENT_URL,
    })
    .json({
      success: true,
      responseData :{
        user,
        token
      },
    });
  });


export const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id; 

    const profile = await User.findById(userId);
    
    res.status(200).json({
      success: true,
      responseData : profile,  
    });
    
  })


export const logout = asyncHandler(async (req, res, next) => {
    
    res.status(200)
    .cookie("token","", { 
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "None"
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
    
  })


export const getOtherUsers = asyncHandler(async (req, res, next) => {

  const otherUsers = await User.find({_id: {$ne: req.user._id}}); // $ne means not equal to 
    
    res.status(200)
    .json({
      success: true,
      responseData: otherUsers,
    });
    
  })


