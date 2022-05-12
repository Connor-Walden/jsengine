class ShapeRenderer extends Component {
  constructor(entity, renderer, sname, pos, color, fill) {
    super(entity, 'ShapeRenderer');
    this.sname = sname;
    this.renderer = renderer;
    this.pos = pos;
    this.color = color;
    this.fill = fill;
  }

  OnAttach() {
    switch(this.sname) {
      case 'rect':
        this.shape = new Rectangle(this.renderer, this.pos.x, this.pos.y, this.pos.w, this.pos.h, this.color.r, this.color.g, this.color.b, this.fill);
        break;
      case 'arc':
        this.shape = new Arc(this.renderer, this.pos.x, this.pos.y, this.pos.r, this.pos.s, this.pos.e, this.color.r, this.color.g, this.color.b, this.fill);
        break;
    }
  }

  OnUpdate() {
    this.shape.draw();
  }
}