const apiUrl = process.env.REACT_APP_API_URL || '/api';

function buildRequest(resource) {
  return apiUrl + resource;
}

export {
  buildRequest,
}
