
const http = require('http');
const fs = require('fs');

const path = require('path');
const port = 3000;



const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
    const extName = path.extname(filePath).toLocaleLowerCase();

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png'
    }

    const contentType = mimeTypes[extName] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {

        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" }); //head
                res.end("404: File not found brother!"); //body
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });  //head
            res.end(content);  //body
        }
    });
});



server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

