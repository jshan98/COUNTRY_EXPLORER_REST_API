const http = require('http');
const controller = require('./controller.js');

// Creates server and sends response
const server = http.createServer(controller.handleRequest);

const PORT = 3000;

// Listens for server on port 3000
server.listen(PORT, function(){
    console.log('Server running a http://localhost:' + PORT + '/');
});