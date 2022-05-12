class GameLayer extends Layer {
  constructor(game, name) {
    super(name);

    this.renderer = game.renderer;
  }

  OnAttach() {
    this.sprite = new Sprite(this.renderer, 'img/test.jpg', 0, 0, 220, 277, 320, 180, 640, 360);
  }

  OnUpdate() {
    this.sprite.draw();
  }
}
