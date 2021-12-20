export default function createGame() {
    console.log('createGame: init');
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    };
    const currentPlayerId = 'player1';

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
        const playerId = command.playerId;
        const keyPressed = command.keyPressed;
        const moveFunction = acceptedMoves[keyPressed];

        if (moveFunction) {
            moveFunction(player);
            checkForFruitCollision(playerId);
        }

        function checkForFruitCollision(playerId) { // Brute force
            let fruit;
            const player = state.players[playerId];
            for (const fruitId in state.fruits) {
                fruit = state.fruits[fruitId];
                if (player.x === fruit.x && player.y === fruit.y) {
                    console.log(`Collision between player ${playerId} and fruit ${fruitId}`);
                    removeFruit({fruitId});
                }
            }
        }
        
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