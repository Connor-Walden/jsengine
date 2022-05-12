class Text {
  constructor(renderer, msg, size, x, y, align, r, g, b) {
    this.renderer = renderer;
    this.msg = msg;
    this.size = size;
    this.x = x;
    this.y = y;
    this.color = { r, g, b }

    this.width = this.renderer.context.measureText(this.msg).width;

    switch(align) {
      case 'CENTER':
        this.x = this.x - (this.width / 2);
        break;
      case 'NORMAL':
        this.x = this.x;
        break;
    }
  }

  draw() {
    this.renderer.color(this.color.r, this.color.g, this.color.b);
    this.renderer.text(this.msg, this.size, this.x, this.y);
  }
}
