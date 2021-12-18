const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

const state = {
    players: {
        player1: { x: 1, y: 1, width: 1, height: 1, color: 'black' },
        player2: { x: 9, y: 9, width: 1, height: 1, color: 'black' }
    },
    fruits: {
        fruit1: { x: 3, y: 1, width: 1, height: 1, color: 'green' }
    }
};

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);
renderScreen();

function createGame() {
    
    function movePlayer(command) {
        console.log(`Moving player ${command.playerId} with command ${command.keyDown}`);
        const player = state.players[command.playerId];
        const keyPressed = command.keyPressed;
        if (keyPressed === 'ArrowUp' && player.y - 1 >= 0) {
            player.y--;
            console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        }
        if (keyPressed === 'ArrowDown' && player.y + 1 < screen.height) {
            player.y++;
            console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        }
        if (keyPressed === 'ArrowRight' && player.x + 1 < screen.height) {
            player.x++;
            console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        }
        if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
            player.x--;
            console.log(state.players[currentPlayerId].x, state.players[currentPlayerId].y);
        }
    }
    return {
        movePlayer,
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