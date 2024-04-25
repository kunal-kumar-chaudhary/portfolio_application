export const errorHandler = (statusCode, message) => {
    // Create a new error object
    const err = new Error();
    // Set the error message and status code
    err.message = message;
    // Set the status code
    err.statusCode = statusCode;
    return err;
}
