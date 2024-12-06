const prodError = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later!",
            statusCode: err.statusCode
        });
    }
};

export default prodError;
