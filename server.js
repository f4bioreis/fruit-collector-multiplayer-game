import http from 'http';
import fs from 'fs';

const port = 8080;

const server = http.createServer((req, res) => {
   console.log('The request was made: ', req.url);
   res.writeHead(200, {'Content-Type': 'text/html'});
   let myReadStream = fs.createReadStream('./index.html', 'utf-8');
   myReadStream.pipe(res);
});

server.listen(port, '127.0.0.1');
console.log('Listening on port ' + port);