let http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Held!</h1>');
}).listen(5000, 'localhost', () => { console.log('Server is created'); })