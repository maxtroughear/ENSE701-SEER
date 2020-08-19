const apiUrl = process.env.REACT_APP_API_URL || '/api';

function buildRequest(resource) {
  console.log(apiUrl);
  console.log(apiUrl + resource);
  return apiUrl + resource;
}

export {
  buildRequest,
}
