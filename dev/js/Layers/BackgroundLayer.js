class BackgroundLayer extends Layer {
  constructor(game, name) {
    super(name);

    this.renderer = game.renderer;
  }

  OnAttach() {
    // Create Entities for this layer
    const ent = new Entity(0, 'background');
    ent.AddComponent(new Transform(ent, { x: 0, y: 0 }, 0, 1));
    ent.AddComponent(new SpriteRenderer(ent, this.renderer, 'img/background.jpg', { x: 0, y: 0, w: this.renderer.canvas.width, h: this.renderer.canvas.height }));

    // Register the entities with the layer
    this.AddEntity(ent);

    // call all of the entity's OnAttach() methods
    super.OnAttach(); 
  }
}
