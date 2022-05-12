class Game {
  constructor(title, width, height) {
    this.title = title;
    document.title = title;

    this.layerstack = [];

    this.width = width;
    this.height = height;
    this.renderer = new Renderer(width, height);
  }

  init() {
    for(let i = 0; i < this.layerstack.length; i++) {
      if(this.layerstack[i] instanceof Layer) this.layerstack[i].OnAttach();
    }
  }

  tick() {
    this.renderer.clear(this.renderer.CLEAR_COLOR_BLACK);

    if(this.layerstack[0]) Input.isKeyDown('1') ? this.layerstack[0].Disable() : this.layerstack[0].Enable();
    if(this.layerstack[1]) Input.isKeyDown('2') ? this.layerstack[1].Disable() : this.layerstack[1].Enable();
    if(this.layerstack[2]) Input.isKeyDown('3') ? this.layerstack[2].Disable() : this.layerstack[2].Enable();
    if(this.layerstack[3]) Input.isKeyDown('4') ? this.layerstack[3].Disable() : this.layerstack[3].Enable();
    if(this.layerstack[4]) Input.isKeyDown('5') ? this.layerstack[4].Disable() : this.layerstack[4].Enable();
    if(this.layerstack[5]) Input.isKeyDown('6') ? this.layerstack[5].Disable() : this.layerstack[5].Enable();
    if(this.layerstack[6]) Input.isKeyDown('7') ? this.layerstack[6].Disable() : this.layerstack[6].Enable();
    if(this.layerstack[7]) Input.isKeyDown('8') ? this.layerstack[7].Disable() : this.layerstack[7].Enable();
    if(this.layerstack[8]) Input.isKeyDown('9') ? this.layerstack[8].Disable() : this.layerstack[8].Enable();
    if(this.layerstack[9]) Input.isKeyDown('0') ? this.layerstack[9].Disable() : this.layerstack[9].Enable();
  

    for(let i = 0; i < this.layerstack.length; i++) {
      if(this.layerstack[i] instanceof Layer && this.layerstack[i].enabled) this.layerstack[i].OnUpdate();
    }
  }

  push_layer(layer) {
    if(!this.layerstack.includes(layer)) this.layerstack.push(layer);
  }

  get_layer(LID) {
    return this.layerstack[LID];
  }

  pop_layer(layer) {
    let index = this.layerstack.indexOf(layer);

    if(index !== -1) { // layer exists!
      this.layerstack.splice(index, 1);
    }
  }
}
