const fs = require('fs'); // pull in the file system module

// load the client page provided as the home page
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// get the index page
const getIndex = (request, response) => {
//   getCSS(request, response);

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// get and load the css file into the client page as text/css
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// set out public exports
module.exports = {
  getIndex,
  getCSS,
};
