(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.screenRenderer = function renderScreen(screen, game, requestAnimationFrame) {
    const context = screen.getContext('2d');
    context.fillStyle = 'white';
    context.clearRect(0, 0, 10, 10);
    let player;
    for (const playerId in game.state.players) {
        player = game.state.players[playerId];
        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, player.width, player.height);
    }
    let fruit;
    for (const fruitId in game.state.fruits) {
        fruit = game.state.fruits[fruitId];
        context.fillStyle = fruit.color;
        context.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);
    }
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame);
    });
}
},{}]},{},[1]);
