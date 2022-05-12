class Entity {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.components = {};
    this.tags = [];
  }

  AddComponent(component) {
    this.components[component.name] = component;
  }

  RemoveComponent(component) {
    delete this.components[component.name];
  }

  HasComponent(component) {
    return this.components[component.name] !== undefined;
  }

  AddTag(tag) {
    this.tags.push(tag);
  }

  RemoveTag(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  HasTag(tag) {
    return this.tags.indexOf(tag) !== -1;
  }

  GetComponent(name) {
    return this.components[name];
  }

  GetComponents() {
    const components = [];
    for (const name in this.components) {
      if (this.components[name] instanceof Component) {
        components.push(this.components[name]);
      }
    }
    return components;
  }

  GetTags() {
    return this.tags;
  }

  GetId() {
    return this.id;
  }

  GetName() {
    return this.name;
  }

  SetName(name) {
    this.name = name;
  }

  OnAttach() {
    this.GetComponents().forEach(component => {
      component.OnAttach();
    });
  }

  OnUpdate() {
    this.GetComponents().forEach(component => {
      component.OnUpdate();
    });
  }
}