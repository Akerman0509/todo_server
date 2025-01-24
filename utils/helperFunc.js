const handleServiceError = (res, error) => {
    // Regular expression to remove two sets of square brackets like [Error][Fail]
    const cleanedMessage = error.message.replace(/^(\[[^\]]+\]){2}\s*/, "");
    console.error("Service Error:", cleanedMessage);
    // console.error('Service Error:', error);

    const errorMap = {
        "not provided": 400, // Bad Request
        Invalid: 400, // Bad Request
        Missing: 400, // Bad Request
        Fail: 400,
        "Validation failed": 422, // Unprocessable Entity

        Exist: 409, // Conflict
        NoneExist: 404, // Not Found
        Unvalid: 401, // Unauthorized
        Unauthorized: 401, // Unauthorized
        Expire: 400,
        Other: 417, // Internal Server Error
    };

    const statusCode =
        Object.entries(errorMap).find(([key]) =>
            error.message.includes(key)
        )?.[1] || 500;

    res.status(statusCode).json({
        message: cleanedMessage, // Send cleaned-up message
        ...(process.env.NODE_ENV === "development" && {
            stack: error.stack,
        }),
    });
};

function handleResponse(success, msg, data) {
    return {
        success: success,
        message: msg,
        data: data,
    };
}


module.exports = { handleServiceError, handleResponse };