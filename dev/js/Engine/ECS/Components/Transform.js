class Transform extends Component {
  constructor(entity, pos, rot, scl) {
    super(entity, 'Transform');
    this.position = pos;
    this.rotation = rot;
    this.scale = scl;
  }

  getPosition() {
    return this.position;
  }

  getRotation() {
    return this.rotation;
  }

  getScale() {
    return this.scale;
  }

  setPosition(pos) {
    this.position = pos;
  }

  setRotation(rot) {
    this.rotation = rot;
  }

  setScale(scl) {
    this.scale = scl;
  }

  translate(pos) {
    this.position.x += pos.x;
    this.position.y += pos.y;
  }

  rotate(rot) {
    this.rotation += rot;
  }

  scale(scl) {
    this.scale += scl;
  }
}