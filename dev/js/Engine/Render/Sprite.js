class Sprite {
  constructor(renderer, source, posx, posy, posw, posh, uvx, uvy, uvw, uvh) {
    this.renderer = renderer;
    this.src = source;
    this.uv = { x: uvx, y: uvy, w: uvw, h: uvh };
    this.pos = { x: posx, y: posy, w: posw, h: posh };

    this.img = new Image(this.pos.w, this.pos.h);
    this.img.src = this.src;
  }

  draw() {
    // If x exists, then, all uv coords should exist (id hope...)
    this.uv.x ? this.renderer.image(this.img, this.pos, this.uv) : this.renderer.image(this.img, this.pos);
  }
}
