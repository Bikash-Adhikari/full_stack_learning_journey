//make HTTP server -- using built-in module of NodeJS
// import http from 'http'; or
const http = require('http');

const fs = require('fs');



//by using the above http-package ==> we can build our own server
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Request Received\n`    //print in log.txt file on each request

    fs.appendFile('log.txt', log, (err, data) => {   //Response
        switch (req.url) {
            case '/': res.end("HomePage");
                break;
            case '/about': res.end("I am Bikash Adhikari");
                break;
            default: res.end("404 Not Found !");
        }
    })
});



myServer.listen(8000, () => {
    try {
        console.log("Server started!");
    } catch (error) {
        console.log("error", error);
    }
});