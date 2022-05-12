class Animator extends Component {
  constructor(entity, data) {
    super(entity, 'Animator');

    this.data = data;
  }

  OnAttach() {
    this.animation = new Animation(this.data.name, this.data.frames, this.data.frameRate, this.data.loop);
  }

  OnUpdate() {
    if(!this.GetEntity().GetComponent('SpriteRenderer')) console.log('No SpriteRenderer component found!');

    this.animation.update(1);
    this.GetEntity().GetComponent('SpriteRenderer').SetImage(this.animation.frame());
  }

  LoadAnimation(data) {
    this.data = data;

    this.OnAttach();
  }

  Play() {
    this.animation.play();
  }

  Stop() {
    this.animation.stop();
  }

  Frame() {
    return this.animation.frame();
  }

  FrameIdx() {
    return this.animation.frameIdx();
  }

  FrameTime() {
    return this.animation.frameTime();
  }

  FrameRate() {
    return this.animation.frameRate();
  }

  Loop() {
    return this.animation.loop();
  }

  Animation() {
    return this.animation;
  }

}