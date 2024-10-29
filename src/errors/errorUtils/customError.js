class customError extends Error {
    constructor(statusCode, message = "Something went wrong") {
        super(message);
        this.statusCode = statusCode || 500;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default customError;
