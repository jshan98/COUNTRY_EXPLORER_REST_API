const http = require('http');

// Creates server and sends response
const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to Country Explorer');
});

const PORT = 3000;

// Listens for server on port 3000
server.listen(PORT, function(){
    console.log('Server running a http://localhost:' + PORT + '/');
});