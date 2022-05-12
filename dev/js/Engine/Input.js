const keys = [];
const mouse = {
  pressed: false,
  x: 0,
  y: 0
};

const listeners = {
  keydown: [],
  keyup: [],
  mousedown: [],
  mouseup: [],
  mousemove: []
};

class Input {
  static isKeyDown(key) {
    return keys.includes(key);
  }

  static isMouseDown() {
    return mouse.pressed;
  }

  static getMousePosition() {
    return { x: mouse.x, y: mouse.y }
  }

  static listen(type, callback) {
    listeners[type].push(callback);
  }
}

document.onkeydown = event => {
  listeners.keydown.forEach(callback => callback(event.key));

  const key = event.key;

  if(!keys.includes(key)) keys.push(key);
}

document.onkeyup = event => {
  listeners.keyup.forEach(callback => callback(event.key));

  var index = keys.indexOf(event.key);
  if (index !== -1) {
    keys.splice(index, 1);
  }
}

document.onmousedown = event => {
  listeners.mousedown.forEach(callback => callback(event.button));
  mouse.pressed = true;
}

document.onmouseup = event => {
  listeners.mouseup.forEach(callback => callback(event.button));
  mouse.pressed = false;
}

document.onmousemove = event => {
  listeners.mousemove.forEach(callback => callback(event.button));
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
}
