const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
   console.log('Rendering index.html');
   res.render('index.html');
});

server.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

io.on('connection', socket => {
   console.log(`Socket has connected: ${socket.id}`);
});
// const port = 8080;

// const server = http.createServer((req, res) => {
//    console.log('The request was made: ', req.url);
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    let myReadStream = fs.createReadStream('./public/index.html', 'utf-8');
//    myReadStream.pipe(res);
// });

// server.listen(port, '127.0.0.1');
// console.log('Listening on port ' + port);