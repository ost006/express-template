function Success(data) {
    return {
        error: null,
        result: data,
    }
}

function Error(errMessage) {
    return {
        error: {
            message: errMessage,
        },
        result: null,
    }
}

module.exports = {
    Success,
    Error,
}