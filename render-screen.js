export default function renderScreen(screen, game, requestAnimationFrame) {
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