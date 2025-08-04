const errorMiddleware = (err, req, res, next) => {
    // Avoid sending headers again
    if (res.headersSent) {
        return next(err);
    }

    const message = err.message || "Something Went Wrong";
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorMiddleware;
