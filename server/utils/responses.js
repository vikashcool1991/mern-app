module.exports = {
  response(res, error, data, message, statusCode) {
    const response = {};
    if (error) {
      response.error = error.message;
    }
    if (data) {
      response.data = data;
    }
    if (message) {
      response.message = message;
    }
    if (Object.keys(response).length === 0) {
      response.data = null;
    }
    return res.status(statusCode).json(response);
  },
};