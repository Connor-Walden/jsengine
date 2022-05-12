class Animation {
  constructor(name, frames, frameRate, loop) {
    this.name = name;
    this.frames = frames;
    this.frameRate = frameRate;
    this.loop = loop;
    this.currentFrame = 0;
    this.currentFrameTime = 0;
    this.playing = false;
  }

  play() {
    this.playing = true;
  }

  stop() {
    this.playing = false;
  }

  update(delta) {
    if(!this.playing) return;

    this.currentFrameTime += delta;

    if(this.currentFrameTime >= this.frameRate) {
      this.currentFrameTime = 0;
      this.currentFrame++;

      if(this.currentFrame >= this.frames.length) {
        if(this.loop) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = this.frames.length - 1;
          this.playing = false;
        }
      }
    }
  }

  frame() {
    return this.frames[this.currentFrame];
  }

  frameIdx() {
    return this.currentFrame;
  }

  frameTime() {
    return this.currentFrameTime;
  }

  frameRate() {
    return this.frameRate;
  }

  loop() {
    return this.loop;
  }

  
}