class GUILayer extends Layer {
  constructor(game, name) {
    super(name);

    this.renderer = game.renderer;
  }

  OnAttach() {
    this.text = new Text(
      this.renderer, 'GUI testing :)', 24,
      this.renderer.canvas.width / 4 - 150, this.renderer.canvas.height / 4 - 20,
      'NORMAL', 255, 255, 255
    );

    this.button = new Button(this.renderer, 50, 50, 100, 50, 255, 255, 255, 'Test button', event => {
      console.log('Button clicked!');
    });
  }

  OnUpdate() {
    this.text.draw();
    this.button.draw();
  }
}
