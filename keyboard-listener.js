export default function createKeyboardListener() {
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