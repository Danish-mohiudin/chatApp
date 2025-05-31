class ErrorHandler extends Error{        // creating custom error class called ErrorHandler, It inherits from the built-in Error class in JavaScript (so it behaves like a normal error, but with custom features).
    constructor(message, statusCode){ 
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor) // without this line, the error report would include unnecessary techinical details like where the error handler class itself is defined. that is not very helpful when you are trying to debug .
        // with error.captureStackTrace, you are saying skip all setup details and just show me where the error occurred.
    }
}

export const errorHandler = ErrorHandler;  // exporting the ErrorHandler class for use in other parts of your code. This allows you to create new instances of ErrorHandler with custom messages and status codes.


/*
2. constructor(message, statusCode)
When you create a new ErrorHandler, you can pass:
A message (e.g., "User not found")
A statusCode (e.g., 404 for not found, 500 for server error)
*/