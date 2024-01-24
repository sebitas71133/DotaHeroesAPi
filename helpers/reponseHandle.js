const handleSuccess = (res,data) => {
   
    res.status(200).json({
        success: true,
        data: data
    });
}

const handleError = (res, statusCode, errorMessage, errorDetails) => {
    res.status(statusCode).json({
        success: false,
        error: {
            message: errorMessage,
            details: errorDetails
        }
    });
};

module.exports = {
    handleSuccess,
    handleError
}