// function to respond with a json object
// takes request, response, status code and object to send
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const xmlResponse = (statusResponse) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${statusResponse.message}</message>`;
  if (statusResponse.id) {
    responseXML = `${responseXML} <id>${statusResponse.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return responseXML;
  }

  responseXML = `${responseXML} </response>`;

  return responseXML;
};

// function to show a success status code
const success = (request, response, acceptedTypes) => {
  // object to send
  const statusResponse = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = xmlResponse(statusResponse);
    console.log(responseXML);

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  console.log(JSON.stringify(statusResponse));
  return respond(request, response, 200, JSON.stringify(statusResponse), 'application/json');
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, acceptedTypes, params) => {
  // object to send
  const statusResponse = {
    id: 'badRequest',
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter return 404
  if (!params.valid || params.valid !== 'true') {
    statusResponse.message = 'Missing valid query parameter set to true';
    statusResponse.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = xmlResponse(statusResponse);
      console.log(responseXML);
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    console.log(JSON.stringify(statusResponse));
    return respond(request, response, 400, JSON.stringify(statusResponse), 'application/json');
  }

  // else return 200 status code
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = xmlResponse(statusResponse);
    console.log(responseXML);
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  console.log(JSON.stringify(statusResponse));
  return respond(request, response, 200, JSON.stringify(statusResponse), 'application/json');
};

// function to show an unauthorized request without the correct parameters
const unauthorized = (request, response, acceptedTypes, params) => {
  // object to send
  const statusResponse = {
    id: 'unauthorized',
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter return 404
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    statusResponse.message = 'Missing loggedIn query parameter set to yes';
    statusResponse.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = xmlResponse(statusResponse);
      console.log(responseXML);
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    console.log(JSON.stringify(statusResponse));
    return respond(request, response, 401, JSON.stringify(statusResponse), 'application/json');
  }

  // else return 200 status code
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = xmlResponse(statusResponse);
    console.log(responseXML);
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  console.log(JSON.stringify(statusResponse));
  return respond(request, response, 200, JSON.stringify(statusResponse), 'application/json');
};

// function to show a forbidden status code
const forbidden = (request, response, acceptedTypes) => {
  // object to send
  const statusResponse = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = xmlResponse(statusResponse);
    console.log(responseXML);
    return respond(request, response, 403, responseXML, 'text/xml');
  }
  console.log(JSON.stringify(statusResponse));
  return respond(request, response, 403, JSON.stringify(statusResponse), 'application/json');
};

// function to show an internal status code
const internal = (request, response, acceptedTypes) => {
  // object to send
  const statusResponse = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = xmlResponse(statusResponse);
    console.log(responseXML);
    return respond(request, response, 500, responseXML, 'text/xml');
  }
  console.log(JSON.stringify(statusResponse));
  return respond(request, response, 500, JSON.stringify(statusResponse), 'application/json');
};

// function to show a not implemented status code
const notImplemented = (request, response, acceptedTypes) => {
  // object to send
  const statusResponse = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = xmlResponse(statusResponse);
    console.log(responseXML);
    return respond(request, response, 501, responseXML, 'text/xml');
  }
  console.log(JSON.stringify(statusResponse));
  return respond(request, response, 501, JSON.stringify(statusResponse), 'application/json');
};

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
  // object to send
  const statusResponse = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = xmlResponse(statusResponse);
    console.log(responseXML);
    return respond(request, response, 404, responseXML, 'text/xml');
  }
  console.log(JSON.stringify(statusResponse));
  return respond(request, response, 404, JSON.stringify(statusResponse), 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
