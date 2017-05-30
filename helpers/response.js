let response = {};

response.response = function (status = true, message) {
    return {
        "status": status,
        "message": message
    };
}

response.error = function (msg) {
    return response.response(false, msg);
}

response.success = function (msg) {
    return response.response(true, msg);
}

module.exports = response;