
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Home: Hello! I am Bikash Adhikari, A Web-App developer");

    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("I am Bikash Adhikari from Gorkha");

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end("404 Not found");
    }
});



server.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
});








