// CREATE (Create a new game obj and a layer array with your custom layer code)
const game = new Game('Test Game', 1280, 720);
const layers = [
    new BackgroundLayer(game, 'Background', 'img/background.jpg'),
    new GameLayer(game, 'Game'),
    new GUILayer(game, 'Graphical User Interface')
];

// INIT (Push layers and initalize the game with these layers attached)
layers.forEach(layer => game.push_layer(layer));
game.init();

const tick = _ => {
    window.requestAnimationFrame(tick);

    game.tick();
}
tick();