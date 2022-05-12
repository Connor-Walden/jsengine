class SpriteRenderer extends Component {
  constructor(entity, renderer, image, pos) {
    super(entity, 'SpriteRenderer');
    this.renderer = renderer;
    this.image = image;
    this.pos = pos;
  }

  OnAttach() {
    this.sprite = new Sprite(this.renderer, this.image, this.pos.x, this.pos.y, this.pos.w, this.pos.h);
  }

  OnUpdate() {
    this.sprite.draw();
  }

  SetImage(spr) {
    this.sprite = spr;
  }
}