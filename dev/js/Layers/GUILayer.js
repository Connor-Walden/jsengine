class GUILayer extends Layer {
  constructor(game, name) {
    super(name);

    this.renderer = game.renderer;

    this.show = true;
  }

  OnAttach() {
    const ent = new Entity(0, 'uiText');
    ent.AddComponent(new Transform(ent, { x: 100, y: 100, w: 0, h: 0 }, 0, 1));
    ent.AddComponent(new TextRenderer(ent, this.renderer, 'Hello World', '24px', { r: 255, g: 255, b: 255 }, true));
    
    const buttonEnt = new Entity(1, 'uiButton');
    buttonEnt.AddComponent(new Transform(buttonEnt, { x: 100, y: 200, w: 100, h: 50 }, 0, 1));
    buttonEnt.AddComponent(new Button(buttonEnt, this.renderer, 'Click Me', { r: 255, g: 255, b: 255 }, () => this.cbFun(ent)));

    this.AddEntity(ent);
    this.AddEntity(buttonEnt);

    super.OnAttach();
  }

  cbFun(entity) {
    if(entity.GetComponent('TextRenderer').GetText() === 'Hello World') {
      entity.GetComponent('TextRenderer').SetText('Clicked');
    } else {
      entity.GetComponent('TextRenderer').SetText('Hello World');
    }
  }
}
