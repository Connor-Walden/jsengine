class BackgroundLayer extends Layer {
  constructor(game, name, bgImage) {
    super(name);

    this.renderer = game.renderer;
    this.image = bgImage;
  }

  OnAttach() {
    this.sprite = new Sprite(this.renderer, this.image, 0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
  }

  OnUpdate() {
    this.sprite.draw();
  }

  SetImage(image) {
    this.image = image;
  
    this.OnAttach();  // re-attach the new sprite
  }
}
