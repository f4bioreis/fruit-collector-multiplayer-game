export default function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    };
    document.addEventListener('keydown', handleKeydown);

    function registerPlayerId(playerId) {
        state.playerId = playerId;
    }

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
            type: 'move-player',
            playerId: state.playerId,
            keyPressed
        };

        notifyAll(command);
    }

    return { subscribe, registerPlayerId };

}