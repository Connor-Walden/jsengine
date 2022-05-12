// CREATE (Create a new game obj and a layer array with your custom layer code)
const game = new Game('Example Game', 1280, 720);
const layers = [
    new ExampleLayer(game, 'example'),
];

// INIT (Push layers and initalize the game with these layers attached)
layers.forEach(layer => game.push_layer(layer));
game.init();

const tick = _ => {
    window.requestAnimationFrame(tick);

    game.tick();
}
tick();