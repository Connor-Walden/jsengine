class UIButton {
  constructor(renderer, x, y, width, height, r, g, b, text, callback) {
    this.renderer = renderer;
    this.rect = { x, y, width, height };
    this.color = { r, g, b };
    this.text = text;
    this.callback = callback;

    this.rect.width = this.renderer.context.measureText(this.text).width;
    this.rect.x = this.rect.x - (this.rect.width / 2);

    Input.listen('mousedown', event => {
      this.click(event);
    });
  }

  draw() {
    this.renderer.color(this.color.r, this.color.g, this.color.b);
    this.renderer.rect(this.rect.x, this.rect.y, this.rect.width * 2, this.rect.height, true);
    this.renderer.color(255-this.color.r, 255-this.color.g, 255-this.color.b);
    this.renderer.text(this.text, 12, this.rect.x + (this.rect.width / 2), this.rect.y + (this.rect.height / 2));
  }

  click(event) {
    let tmpRect = {
      x: this.rect.x,
      y: this.rect.y,
      w: this.rect.width * 2,
      h: this.rect.height
    }

    if (this.isInside(Input.getMousePosition(), tmpRect)) {
      this.callback();
    }
  }

  isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x + rect.w && pos.y < rect.y + rect.h && pos.y > rect.y
  }
}