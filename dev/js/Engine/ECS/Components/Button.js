class Button extends Component {
  constructor(entity, renderer, text, color, callback) {
    super(entity, 'Button');
    this.renderer = renderer;
    this.text = text;
    this.color = color;
    this.callback = callback;
  }

  OnAttach() {
    const pos = this.entity.GetComponent('Transform').getPosition();

    this.button = new UIButton(
      this.renderer, 
      pos.x, pos.y, pos.w, pos.h,
      this.color.r, this.color.g, this.color.b,
      this.text, 
      this.callback
    ); 
  }

  OnUpdate() {
    this.button.draw();
  }

  SetText(text) {
    this.text = text;
  }

  SetColor(color) {
    this.color = color;
  }

  SetPosition(pos) {
    this.pos = pos;
  }

  SetCallback(callback) {
    this.callback = callback;
  }
}