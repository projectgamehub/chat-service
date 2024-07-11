const prodError = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later!"
        });
    }
};

export default prodError;
