const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

const state = {
    players: {},
    fruits: {}
};

const game = createGame();
console.log('game: ', game);
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);
game.addPlayer({playerId: 'player1', playerX: 1, playerY: 1, width: 1, height: 1, color: 'black'});
game.addFruit({fruitId: 'fruit1', fruitX: 4, fruitY: 2, width: 1, height: 1, color: 'green'});
game.addFruit({fruitId: 'fruit2', fruitX: 9, fruitY: 8, width: 1, height: 1, color: 'green'});
game.addFruit({fruitId: 'fruit3', fruitX: 5, fruitY: 5, width: 1, height: 1, color: 'green'});
renderScreen();

function createGame() {

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;
        const playerWidth = command.width;
        const playerHeight = command.height;
        const playerColor = command.color;

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            width: playerWidth,
            height: playerHeight,
            color: playerColor
        };
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;
        const fruitWidth = command.width;
        const fruitHeight = command.height;
        const fruitColor = command.color;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY,
            width: fruitWidth,
            height: fruitHeight,
            color: fruitColor
        };
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];
    }
    
    function movePlayer(command) {
        console.log(`Moving player ${command.playerId} with command ${command.keyPressed}`);

        const acceptedMoves = {
            ArrowUp(player) {
                player.y--;
                console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
            },
            ArrowDown(player) {
                player.y++;
                console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
            },
            ArrowRight(player) {        
                player.x++;
                console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
            },
            ArrowLeft(player) {
                player.x--;
                console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
            }
        }

        const player = state.players[command.playerId];
        const keyPressed = command.keyPressed;
        const moveFunction = acceptedMoves[keyPressed];

        if (moveFunction) {
            moveFunction(player);
            checkForFruitCollision();
        }

        function checkForFruitCollision() { // Brute force
            let player;
            let fruit;
            for (const playerId in state.players) {
                player = state.players[playerId];
                for (const fruitId in state.fruits) {
                    fruit = state.fruits[fruitId];
                    if (player.x === fruit.x && player.y === fruit.y) {
                        console.log(`Collision between player ${playerId} and fruit ${fruitId}`);
                        removeFruit({fruitId})
                    }
                }
            }
        }
        
        // if (keyPressed === 'ArrowUp' && player.y - 1 >= 0) {
        //     player.y--;
        //     console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        // }
        // if (keyPressed === 'ArrowDown' && player.y + 1 < screen.height) {
        //     player.y++;
        //     console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        // }
        // if (keyPressed === 'ArrowRight' && player.x + 1 < screen.height) {
        //     player.x++;
        //     console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        // }
        // if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
        //     player.x--;
        //     console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        // }
    }

    return {
        addPlayer,
        removePlayer,
        movePlayer,
        addFruit,
        removeFruit,
        state
    };
}



function createKeyboardListener() {
    const state = {
        observers: []
    };
    document.addEventListener('keydown', handleKeydown);
    return { subscribe };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        console.log('Notifying all ' + state.observers.length + ' observer(s)');

        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    function handleKeydown(event) {
        const keyPressed = event.key;

        const command = {
            playerId: 'player1',
            keyPressed
        };

        notifyAll(command);
    }

}

function renderScreen() {
    context.fillStyle = 'white';
    context.clearRect(0, 0, 10, 10);
    let player;
    for (const playerId in state.players) {
        player = state.players[playerId];
        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, player.width, player.height);
    }
    let fruit;
    for (const fruitId in state.fruits) {
        fruit = state.fruits[fruitId];
        context.fillStyle = fruit.color;
        context.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);
    }
    requestAnimationFrame(renderScreen);
}