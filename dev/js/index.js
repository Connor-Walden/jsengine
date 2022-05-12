// CREATE
const game = new Game('Test Game', 1280, 720);
const layers = [
  new BackgroundLayer(game, 'Background'),
  new GameLayer(game, 'Game'),
  new GUILayer(game, 'Graphical User Interface')
];

// INIT
layers.forEach(layer => game.push_layer(layer));
game.init();

// TICK
(function animate() {
  window.requestAnimationFrame(animate);

  game.tick();
})();