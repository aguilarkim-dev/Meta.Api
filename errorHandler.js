function errorHandler(err, req, res, next) {
    const errorMessage = (err.message ?? err) || 'Something went wrong.';
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: errorMessage,
    });
}

module.exports = errorHandler;