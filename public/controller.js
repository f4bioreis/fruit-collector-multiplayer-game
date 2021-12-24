import createGame from './game.mjs';
import createKeyboardListener from './keyboard-listener.mjs';
import renderScreen from './render-screen.mjs';
console.log('this is a script');

const game = createGame();
const keyboardListener = createKeyboardListener(document);

let socket = io('http://localhost:3000');

socket.on('connect', () => {
    const playerId = socket.id;
    renderScreen(document.getElementById('screen'), game, requestAnimationFrame, playerId);
});

socket.on('setup', state => {
    console.log('Game state: ', state);
    const playerId = socket.id;
    game.setState(state);
    keyboardListener.registerPlayerId(playerId);
    keyboardListener.subscribe(game.movePlayer);
    keyboardListener.subscribe(command => {
        socket.emit('move-player', command);
    })
});

socket.on('add-player', command => {
    game.addPlayer(command);
    console.log('updated game state: ', game.state);
});

socket.on('move-player', command => {
    const playerId = socket.id;
    if (playerId !== command.playerId) {
        game.movePlayer(command);
    }
});

socket.on('remove-player', command => {
    game.removePlayer(command);
});

socket.on('add-fruit', command => {
    game.addFruit(command);
});

// socket.on('remove-fruit', command => {
//     game.removeFruit(command);
// })