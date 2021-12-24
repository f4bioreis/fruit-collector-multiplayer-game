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

    function start() {
        const frequency = 5000;
        setInterval(addFruit, frequency);
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
        const playerColor = 'color' in command ? command.color : 'black';

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
            playerId,
            playerX,
            playerY
        });
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId
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

        notifyAll({
            type: 'add-fruit',
            fruitId,
            fruitX,
            fruitY
        });
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId
        });
    }
    
    function movePlayer(command) {
        console.log(`Moving player ${command.playerId} with command ${command.keyPressed}`);
        
        notifyAll(command);

        const acceptedMoves = {
            ArrowUp(player) {
                // checks whether the player is beyond the upper border
                if (player.y <= 0) {
                    player.y = state.screen.height - 1;
                }
                else {
                    player.y--;
                }
                console.log(player.x, player.y);
            },
            ArrowDown(player) {
                // checks whether the player is beyond the lower border
                if (player.y >= state.screen.height - 1) {
                    player.y = 0;
                }
                else {
                    player.y++;
                }
                console.log(player.x, player.y);
            },
            ArrowRight(player) {
                // checks whether the player is beyond the right border
                if (player.x >= state.screen.width - 1) {
                    player.x = 0;    
                }
                else {
                    player.x++;    
                }
                console.log(player.x, player.y);
            },
            ArrowLeft(player) {
                // checks whether the player is beyond the left border
                if (player.x <= 0) {
                    player.x = state.screen.width - 1;
                }
                else {
                    player.x--;    
                }
                console.log(player.x, player.y);
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