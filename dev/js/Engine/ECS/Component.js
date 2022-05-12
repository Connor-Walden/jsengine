class Component {
  constructor(entity, name) {
    this.entity = entity;
    this.name = name;
  }

  OnAttach() {
    // Override this method in your own component class.
  }

  OnUpdate() {
    // Override this method in your own component class.
  }

  GetEntity() {
    return this.entity;
  }
}