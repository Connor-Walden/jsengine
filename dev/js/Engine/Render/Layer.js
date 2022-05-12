class Layer {
  constructor(name) {
    this.name = name;
    this.enabled = true;

    this.entities = [];
  }

  OnAttach() {
    this.GetEntities().forEach(entity => {
      entity.OnAttach();
    });  
  }

  OnUpdate() {
    this.GetEntities().forEach(entity => {
      entity.OnUpdate();
    });  
  }

  Enable() {
    this.enabled = true;
  }

  Disable() {
    this.enabled = false;
  }

  AddEntity(entity) {
    this.entities.push(entity);
  }

  RemoveEntity(entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  HasEntity(entity) {
    return this.entities.indexOf(entity) !== -1;
  }

  GetEntities() {
    return this.entities;
  }
}
