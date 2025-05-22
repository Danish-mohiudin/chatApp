export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        success: false,
        errMessage: err.message,
    });
};

/*
errorMiddleware runs only when an error occurs, & only after a route or middleware calls next(err) or throws an error,

Qs:-if i already had a errorhandler class then why i needed this errorMiddleware 
✅ Quick Answer:
Your ErrorHandler class creates custom error objects with a message and statusCode,
but you still need error middleware to catch those errors and send them as HTTP responses.


🔁 The Relationship:
Part  What it does
ErrorHandler class :-	        Creates error objects with custom messages and status codes
errorMiddleware function :-   	Catches thrown/passed errors and sends a JSON response to the client

🔥 Example to Visualize It
🔹 1. You throw an error in a controller:
import { errorHandler } from "../utilities/ErrorHandlerClass.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const user = null;
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  res.json(user);
});
This uses your ErrorHandler class to create an error with message + statusCode.

🔹 2. That error is passed to next()
This moves it along to Express’s error system.

🔹 3. Your errorMiddleware catches it:
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    errMessage: err.message,
  });
};
It reads the values from the error object (created by your class) and sends a proper response to the client.

✅ Summary
So to answer your question directly:
If I already have ErrorHandler, why do I need errorMiddleware?
Because:
ErrorHandler only creates and describes the error.
errorMiddleware is what actually catches and responds to the client with that error.
They work together, like this:

❗ ErrorHandler throws →
🔄 asyncHandler catches and forwards it →
✅ errorMiddleware handles it and sends a response , when used next(new errorHandler("User not found", 404));

Let me know if you want to improve the ErrorHandler class to include things like errors array or differentiate 
between development vs production mode.




short summary:-
so actually the class identifies the error and the function sends it to the user ?
🎯 Exactly right!
You've nailed it. Here's your insight, reworded clearly:

✅ Final Summary:
🧱 ErrorHandler class →
Creates a custom error object with a message, statusCode, and stack trace.

🚀 errorMiddleware function →
Catches that error (when it's passed via next(err) or throw) and sends a structured response to the user/client.

🔄 Think of it Like:
Part	Job Description
ErrorHandler	"Hey, an error happened! Here’s the details."
errorMiddleware	"Got it. I’ll take this and send a clean response to the client."

*/