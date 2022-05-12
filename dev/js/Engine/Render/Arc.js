class Arc {
  constructor(renderer, x, y, rad, start, end, r, g, b, fill) {
    this.renderer = renderer;
    this.arc = { x, y, rad, start, end };
    this.color = { r, g, b };
    this.fill = fill;
  }

  draw() {
    this.renderer.color(this.color.r, this.color.g, this.color.b);
    this.renderer.arc(this.arc.x, this.arc.y, this.arc.rad, this.arc.start, this.arc.end, this.fill);
  }
}