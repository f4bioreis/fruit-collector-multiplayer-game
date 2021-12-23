export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    };
    const observers = [];
    const currentPlayerId = 'player1';

    function start() {
        // const frequency = 2000;
        // setInterval(addFruit, frequency);
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command);
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
        const playerWidth = 'width' in command ? command.width : 1;
        const playerHeight = 'height' in command ? command.height : 1;
        const playerColor = 'color' in command ? command.color : 1;

        console.log('Adding player in position (' + playerX + ', ' + playerY + ')');

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            width: playerWidth,
            height: playerHeight,
            color: playerColor
        };

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        });
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        });
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
        const fruitX = command && 'fruitX' in command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = command && 'fruitY' in command ? command.fruitY : Math.floor(Math.random() * state.screen.height)
        const fruitWidth = command && 'width' in command ? command.width : 1;
        const fruitHeight = command &&  command &&  'height' in command ? command.height : 1;
        const fruitColor = command && 'color in command' ? command.color : 'green';

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

        function checkForFruitCollision(playerId) {
            let fruit;
            const player = state.players[playerId];
            for (const fruitId in state.fruits) {
                fruit = state.fruits[fruitId];
                if (player.x === fruit.x && player.y === fruit.y) {
                    console.log(`Collision between player ${playerId} and fruit ${fruitId}`);
                    removeFruit({fruitId})
                }
            }
        }
        
    }

    function setState(newState) {
        Object.assign(state, newState);
    }

    return {
        start,
        addPlayer,
        removePlayer,
        movePlayer,
        addFruit,
        removeFruit,
        setState,
        subscribe,
        state
    };
}