// import createKeyboardListener from './keyboard-listener.js';
// import createGame from './game.js';

// const screen = document.getElementById('screen');
// const context = screen.getContext('2d');
// const currentPlayerId = 'player1';

// const state = {
//     players: {},
//     fruits: {}
// };

// const game = createGame();
// const keyboardListener = createKeyboardListener();
// keyboardListener.subscribe(game.movePlayer);
// game.addPlayer({playerId: 'player1', playerX: 1, playerY: 1, width: 1, height: 1, color: 'black'});
// game.addPlayer({playerId: 'player2', playerX: 9, playerY: 1, width: 1, height: 1, color: 'black'});
// game.addFruit({fruitId: 'fruit1', fruitX: 4, fruitY: 2, width: 1, height: 1, color: 'green'});
// game.addFruit({fruitId: 'fruit2', fruitX: 9, fruitY: 8, width: 1, height: 1, color: 'green'});
// game.addFruit({fruitId: 'fruit3', fruitX: 5, fruitY: 5, width: 1, height: 1, color: 'green'});

// renderScreen();

// function renderScreen() {
//     context.fillStyle = 'white';
//     context.clearRect(0, 0, 10, 10);
//     let player;
//     for (const playerId in state.players) {
//         player = state.players[playerId];
//         context.fillStyle = player.color;
//         context.fillRect(player.x, player.y, player.width, player.height);
//     }
//     let fruit;
//     for (const fruitId in state.fruits) {
//         fruit = state.fruits[fruitId];
//         context.fillStyle = fruit.color;
//         context.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);
//     }
//     requestAnimationFrame(renderScreen);
// }
console.log('I am the controller');