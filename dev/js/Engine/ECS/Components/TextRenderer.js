class TextRenderer extends Component {
  constructor(entity, renderer, text, size, color, pos, center) {
    super(entity, 'TextRenderer');
    this.renderer = renderer;
    this.text = text;
    this.size = size;
    this.color = color;
    this.pos = pos;
    this.center = center;
  }

  OnAttach() {
    const pos = this.entity.GetComponent('Transform').getPosition();

    this.uiText = new Text(
      this.renderer, this.text, this.size,
      pos.x, pos.y,
      this.center ? 'CENTER' : 'NORMAL', 
      this.color.r, this.color.g, this.color.b
    );  
  }

  OnUpdate() {
    this.uiText.draw();
  }

  SetText(text) {
    this.uiText.msg = text;
  }

  GetText() {
    return this.uiText.msg;
  }

  SetCenter(center) {
    this.uiText.center = center;
  }
}