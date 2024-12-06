const devError = (res, err) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err,
        stackTrace: err.stack,
        statusCode: err.statusCode
    });
};

export default devError;
