exports.buildErrorMessage = (error, details) => {
    return {
        errorMessage: error,
        details: details.message,
    };
};