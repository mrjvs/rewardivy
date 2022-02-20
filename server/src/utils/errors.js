const errors = {
  UNKNOWN_ERROR: {
    id: 900,
    status: 500,
    friendlyName: "Unknown Error",
    friendlyDescription: "An unknown error occured"
  },
  NOT_LOGGED_IN: {
    id: 101,
    status: 403,
    friendlyName: "Not Logged In",
    friendlyDescription: "Please login to view this data",
  },
  NO_ENDPOINT: {
    id: 901,
    status: 404,
    friendlyName: "Endpoint not recognized",
    friendlyDescription: "This endpoint is not assigned"
  },
}

function sendError(res, error) {
  res.status(error.status).json({
    success: false,
    ...error
  });
}

function sendData(res, data) {
  res.status(200).json({
    success: true,
    payload: data
  });
}

module.exports = {
  errors,
  sendError,
  sendData,
}
