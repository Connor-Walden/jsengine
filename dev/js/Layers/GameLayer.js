class GameLayer extends Layer {
  constructor(game, name) {
    super(name);

    this.renderer = game.renderer;
  }

  OnAttach() {
    const animation = {
      name: 'test animation',
      frames: [
        new Sprite(this.renderer, 'img/test.jpg', 0, 0, 220, 277),
        new Sprite(this.renderer, 'img/test.jpg', 100, 0, 220, 277),
        new Sprite(this.renderer, 'img/test.jpg', 200, 0, 220, 277),
        new Sprite(this.renderer, 'img/test.jpg', 300, 0, 220, 277)
      ],
      frameRate: 10,
      loop: true
    };

    const animatedSprite = new Entity(0, 'animated sprite');
    animatedSprite.AddComponent(new Transform(animatedSprite, { x: 0, y: 0 }, 0, 1));
    animatedSprite.AddComponent(new SpriteRenderer(animatedSprite, this.renderer, 'img/test.jpg', { x: 0, y: 0, w: 220, h: 277 }));
    animatedSprite.AddComponent(new Animator(animatedSprite, animation));

    const rectEnt = new Entity(1, 'rectangle');
    rectEnt.AddComponent(new Transform(rectEnt, { x: 0, y: 0 }, 0, 1));
    rectEnt.AddComponent(new ShapeRenderer(rectEnt, this.renderer, 'rect', {x: 250, y: 250, w: 100, h: 100}, {r: 255, g: 0, b: 0}, true));

    const circleEnt = new Entity(2, 'circle');
    circleEnt.AddComponent(new Transform(circleEnt, { x: 0, y: 0 }, 0, 1));
    circleEnt.AddComponent(new ShapeRenderer(circleEnt, this.renderer, 'arc', { x: 400, y: 400, r: 50, s: 0, e: Math.PI * 2 }, { r: 0, g: 255, b: 0 }, true));

    this.AddEntity(rectEnt);
    this.AddEntity(circleEnt);
    this.AddEntity(animatedSprite);

    super.OnAttach();

    animatedSprite.GetComponent('Animator').Play();
  }
}
