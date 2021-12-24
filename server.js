import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import createGame from './public/game.mjs';

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

const port = 3000;

app.use(express.static('public'));

const game = createGame();
game.start();
game.subscribe(command => {
   console.log(`> Emitting: ${command.type}`);
   console.log('All fruits: ', game.state.fruits);
   sockets.emit(command.type, command);
})

if (game) {
   console.log('Game state: ', game.state);
}

server.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

sockets.on('connection', socket => {
   console.log(`Socket has connected: ${socket.id}`);
   const playerId = socket.id;
   game.addPlayer({ playerId: socket.id, width: 1, height: 1});
   game.addFruit({ fruitId: 'fruit1', fruitX: 8, fruitY: 9, width: 1, height: 1, color: 'green'});
   console.log('Passing server game state to client');
   socket.emit('setup', game.state);

   socket.on('disconnect', () => {
      console.log('Socket has disconnected: ' + socket.id);
      game.removePlayer({playerId: playerId});
   });

   socket.on('move-player', command => {
      console.log('Moving player ' + command.playerId);
      command.playerId = playerId;
      command.type = 'move-player';
      game.movePlayer(command);
   });
   
});