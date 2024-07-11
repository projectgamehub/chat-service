class customError extends Error {
    constructor(statusCode = 500, message = "Something went wrong") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default customError;
