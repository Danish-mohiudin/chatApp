class ErrorHandler extends Error{        // creating custom error class called ErrorHandler, It inherits from the built-in Error class in JavaScript (so it behaves like a normal error, but with custom features).
    constructor(message, statusCode){ 
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}

export const errorHandler = ErrorHandler;  // exporting the ErrorHandler class for use in other parts of your code. This allows you to create new instances of ErrorHandler with custom messages and status codes.


/*
2. constructor(message, statusCode)
When you create a new ErrorHandler, you can pass:
A message (e.g., "User not found")
A statusCode (e.g., 404 for not found, 500 for server error)
*/