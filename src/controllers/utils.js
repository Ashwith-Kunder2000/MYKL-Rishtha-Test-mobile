function parseRequestBody(body) {
    // Convert body to a JSON string
    const jsonString = JSON.stringify(body);
    console.log('Incoming Request : ' + jsonString);

    // Parse the JSON string back into an object
    const parsedRequest = JSON.parse(jsonString);
    return parsedRequest;
}

// Helper function to handle error responses
function respondWithError(req, res, statusCode, errors) {
    if (req.accepts('json')) {
        res.status(statusCode).json({ errorcode:statusCode, error: errors });
    }
}

// Helper function to handle success responses
function respondWithSuccess(req, res, data) {
    if (req.accepts('json')) {
        res.json(data);
    }
}

// Export the functions
module.exports = {
    parseRequestBody,
    respondWithError,
    respondWithSuccess
};