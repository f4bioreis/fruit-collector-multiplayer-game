(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.keyboardListenerCreator = function createKeyboardListener(document) {
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
},{}]},{},[1]);
