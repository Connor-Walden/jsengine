class Rectangle {
  constructor(renderer, x, y, w, h, r, g, b, fill) {
    this.renderer = renderer;
    this.rect = { x, y, w, h }
    this.color = { r, g, b }
    this.fill = fill;
  }

  draw() {
    this.renderer.color(this.color.r, this.color.g, this.color.b);
    this.renderer.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h, this.fill);
  }
}