import { asyncHandler } from "../utilities/asyncHandlerUtility.js";
import { errorHandler } from "../utilities/errorHandlerUtility.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async(req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.replace("Bearer ", ""); // It first checks for the token in cookies: req.cookies.token, If not there, it checks the Authorization header:
    //console.log("and here the token is ",token)
    if(!token) {
        return next(new errorHandler("Not authorized, token required", 401));
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenData
    next();
    // Verifies the token using jwt.verify() with your secret key.
    // If the token is valid, it returns the data (payload) stored in the token.
    // That payload (like { id: 'user123' }) is then attached to req.user.
}) 