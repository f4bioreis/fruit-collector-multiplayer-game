// const express = require('express');
// const path = require('path');
// const http = require('http');
// const socketio = require('socket.io');
// const thisIsATest = require('./public/thisIsATest');
// const gameCreator = require('./public/game.mjs');

import express from 'express';
import path from 'path';
import http from 'http';
import {Server} from 'socket.io';
import createGame from './public/game.mjs';
import ejs from 'ejs';

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

const port = 3000;

app.use(express.static('public'));
// app.set('views', 'public');
// app.engine('html', ejs.renderFile);
// app.set('view engine', 'html');

// app.use('/', (req, res) => {
//    res.render('index.html');
// });

const game = createGame();
game.start();
game.subscribe(command => {
   console.log(`> Emitting: ${command.type}`);
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
   game.addPlayer({ playerId: socket.id, width: 1, height: 1, color: 'black'});
   game.addFruit({ fruitId: 'fruit1', fruitX: 8, fruitY: 9, width: 1, height: 1, color: 'green'});
   socket.emit('setup', game.state);

   socket.on('disconnect', () => {
      console.log('Removing player with ID ' + socket.id);
      game.removePlayer({playerId: playerId});
   });

   socket.on('move-player', command => {
      command.playerId = playerId;
      command.type = 'move-player';
      
      game.movePlayer(command);
   })
});