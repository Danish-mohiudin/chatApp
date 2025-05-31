export const asyncHandler = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch((err) => next(err));

/*
✅ Your Understanding (Refined)
When we pass a function to asyncHandler, it returns a new function that:
Calls the original function (that we passed)
If the function executes successfully, it just runs and sends the response (no interruption)
If it throws an error or returns a rejected promise, the .catch(next) part catches it and forwards it to Express’s 
error middleware

if the function fails the errorHandler will be pased inide the next()
i.e return next(new errorHandler('Please Enter a valid username or password', 400)
     );
*/