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

    if (!keys.includes(key)) keys.push(key);
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
class Renderer {
    /**
     * Construct a new Renderer
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height) {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = width;
        this.canvas.height = height;

        this.current_color = 'black';

        this.CLEAR_COLOR_BLACK = 'black';
        this.CLEAR_COLOR_WHITE = 'white';
        this.CLEAR_COLOR_RED = 'red';
        this.CLEAR_COLOR_BLUE = 'blue';
        this.CLEAR_COLOR_GREEN = 'green';
        this.CLEAR_COLOR_YELLOW = 'yellow';
    }

    /**
     * Clear the canvas by a desired color
     * @param {String} color Ex. '#d3d3d3' or 'red'
     */
    clear(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Sets the color of the next render command
     * @param {Number} r 
     * @param {Number} g 
     * @param {Number} b 
     */
    color(r, g, b) {
        this.current_color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    /**
     * Render a rectangle on the canvas
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     * @param {Boolean} fill 
     */
    rect(x, y, w, h, fill) {
        if (fill) {
            this.context.fillStyle = this.current_color;
            this.context.fillRect(x, y, w, h);
        } else {
            this.context.strokeStyle = this.current_color;
            this.context.strokeRect(x, y, w, h);
        }
    }

    /**
     * Draw an arc (could be a curve, circle, etc)
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} r 
     * @param {Number} s 
     * @param {Number} e 
     * @param {Boolean} fill 
     */
    arc(x, y, r, s, e, fill) {
        this.context.fillStyle = this.current_color;
        this.context.beginPath();
        this.context.arc(x, y, r, s, e);
        fill ? this.context.fill() : this.context.stroke();
    }

    /**
     * Render text on the canvas
     * @param {String} msg 
     * @param {Number} size 
     * @param {Number} x 
     * @param {Number} y 
     */
    text(msg, size, x, y) {
        this.context.fillStyle = this.current_color;
        this.context.font = size + 'px Sans Serif';
        this.context.fillText(msg, x, y);
    }

    /**
     * Render an image to the canvas with uv control
     * @param {String} img 
     * @param {Object} pos 
     * @param {Object} uv 
     */
    image(img, pos, uv) {
        if (uv) {
            this.context.drawImage(img, uv.x, uv.y, uv.w, uv.h, pos.x, pos.y, pos.w, pos.h);
        } else {
            this.context.drawImage(img, pos.x, pos.y, pos.w, pos.h);
        }
    }
}
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
class Text {
    constructor(renderer, msg, size, x, y, align, r, g, b) {
        this.renderer = renderer;
        this.msg = msg;
        this.size = size;
        this.x = x;
        this.y = y;
        this.color = { r, g, b }

        this.width = this.renderer.context.measureText(this.msg).width;

        switch (align) {
            case 'CENTER':
                this.x = this.x - (this.width / 2);
                break;
            case 'NORMAL':
                this.x = this.x;
                break;
        }
    }

    draw() {
        this.renderer.color(this.color.r, this.color.g, this.color.b);
        this.renderer.text(this.msg, this.size, this.x, this.y);
    }
}
class UIButton {
    constructor(renderer, x, y, width, height, r, g, b, text, callback) {
        this.renderer = renderer;
        this.rect = { x, y, width, height };
        this.color = { r, g, b };
        this.text = text;
        this.callback = callback;

        this.rect.width = this.renderer.context.measureText(this.text).width;
        this.rect.x = this.rect.x - (this.rect.width / 2);

        Input.listen('mousedown', event => {
            this.click(event);
        });
    }

    draw() {
        this.renderer.color(this.color.r, this.color.g, this.color.b);
        this.renderer.rect(this.rect.x, this.rect.y, this.rect.width * 2, this.rect.height, true);
        this.renderer.color(255 - this.color.r, 255 - this.color.g, 255 - this.color.b);
        this.renderer.text(this.text, 12, this.rect.x + (this.rect.width / 2), this.rect.y + (this.rect.height / 2));
    }

    click(event) {
        let tmpRect = {
            x: this.rect.x,
            y: this.rect.y,
            w: this.rect.width * 2,
            h: this.rect.height
        }

        if (this.isInside(Input.getMousePosition(), tmpRect)) {
            this.callback();
        }
    }

    isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.w && pos.y < rect.y + rect.h && pos.y > rect.y
    }
}
class Rectangle {
    constructor(renderer, x, y, w, h, r, g, b, fill) {
        this.renderer = renderer;
        this.rect = { x, y, w, h }
        this.color = { r, g, b }
        this.fill = fill;
    }

    draw() {
        this.renderer.color(this.color.r, this.color.g, this.color.b);
        this.renderer.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h, this.fill);
    }
}
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
        if (!this.playing) return;

        this.currentFrameTime += delta;

        if (this.currentFrameTime >= this.frameRate) {
            this.currentFrameTime = 0;
            this.currentFrame++;

            if (this.currentFrame >= this.frames.length) {
                if (this.loop) {
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
class SpriteRenderer extends Component {
    constructor(entity, renderer, image, pos) {
        super(entity, 'SpriteRenderer');
        this.renderer = renderer;
        this.image = image;
        this.pos = pos;
    }

    OnAttach() {
        this.sprite = new Sprite(this.renderer, this.image, this.pos.x, this.pos.y, this.pos.w, this.pos.h);
    }

    OnUpdate() {
        this.sprite.draw();
    }

    SetImage(spr) {
        this.sprite = spr;
    }
}
class ShapeRenderer extends Component {
    constructor(entity, renderer, sname, pos, color, fill) {
        super(entity, 'ShapeRenderer');
        this.sname = sname;
        this.renderer = renderer;
        this.pos = pos;
        this.color = color;
        this.fill = fill;
    }

    OnAttach() {
        switch (this.sname) {
            case 'rect':
                this.shape = new Rectangle(this.renderer, this.pos.x, this.pos.y, this.pos.w, this.pos.h, this.color.r, this.color.g, this.color.b, this.fill);
                break;
            case 'arc':
                this.shape = new Arc(this.renderer, this.pos.x, this.pos.y, this.pos.r, this.pos.s, this.pos.e, this.color.r, this.color.g, this.color.b, this.fill);
                break;
        }
    }

    OnUpdate() {
        this.shape.draw();
    }
}
class TextRenderer extends Component {
    constructor(entity, renderer, text, size, color, pos, center) {
        super(entity, 'TextRenderer');
        this.renderer = renderer;
        this.text = text;
        this.size = size;
        this.color = color;
        this.pos = pos;
        this.center = center;
    }

    OnAttach() {
        const pos = this.entity.GetComponent('Transform').getPosition();

        this.uiText = new Text(
            this.renderer, this.text, this.size,
            pos.x, pos.y,
            this.center ? 'CENTER' : 'NORMAL',
            this.color.r, this.color.g, this.color.b
        );
    }

    OnUpdate() {
        this.uiText.draw();
    }

    SetText(text) {
        this.uiText.msg = text;
    }

    GetText() {
        return this.uiText.msg;
    }

    SetCenter(center) {
        this.uiText.center = center;
    }
}
class Animator extends Component {
    constructor(entity, data) {
        super(entity, 'Animator');

        this.data = data;
    }

    OnAttach() {
        this.animation = new Animation(this.data.name, this.data.frames, this.data.frameRate, this.data.loop);
    }

    OnUpdate() {
        if (!this.GetEntity().GetComponent('SpriteRenderer')) console.log('No SpriteRenderer component found!');

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
class Button extends Component {
    constructor(entity, renderer, text, color, callback) {
        super(entity, 'Button');
        this.renderer = renderer;
        this.text = text;
        this.color = color;
        this.callback = callback;
    }

    OnAttach() {
        const pos = this.entity.GetComponent('Transform').getPosition();

        this.button = new UIButton(
            this.renderer,
            pos.x, pos.y, pos.w, pos.h,
            this.color.r, this.color.g, this.color.b,
            this.text,
            this.callback
        );
    }

    OnUpdate() {
        this.button.draw();
    }

    SetText(text) {
        this.text = text;
    }

    SetColor(color) {
        this.color = color;
    }

    SetPosition(pos) {
        this.pos = pos;
    }

    SetCallback(callback) {
        this.callback = callback;
    }
}
class Script extends Component {
    constructor(entity, script) {
        super(entity, "Script");
        this.script = script;
    }

    OnAttach() {
        this.script.OnAttach(this.entity);
    }

    OnUpdate() {
        this.script.OnUpdate(this.entity);
    }
}
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
        for (let i = 0; i < this.layerstack.length; i++) {
            if (this.layerstack[i] instanceof Layer) this.layerstack[i].OnAttach();
        }
    }

    tick() {
        this.renderer.clear(this.renderer.CLEAR_COLOR_BLACK);

        if (this.layerstack[0]) Input.isKeyDown('1') ? this.layerstack[0].Disable() : this.layerstack[0].Enable();
        if (this.layerstack[1]) Input.isKeyDown('2') ? this.layerstack[1].Disable() : this.layerstack[1].Enable();
        if (this.layerstack[2]) Input.isKeyDown('3') ? this.layerstack[2].Disable() : this.layerstack[2].Enable();
        if (this.layerstack[3]) Input.isKeyDown('4') ? this.layerstack[3].Disable() : this.layerstack[3].Enable();
        if (this.layerstack[4]) Input.isKeyDown('5') ? this.layerstack[4].Disable() : this.layerstack[4].Enable();
        if (this.layerstack[5]) Input.isKeyDown('6') ? this.layerstack[5].Disable() : this.layerstack[5].Enable();
        if (this.layerstack[6]) Input.isKeyDown('7') ? this.layerstack[6].Disable() : this.layerstack[6].Enable();
        if (this.layerstack[7]) Input.isKeyDown('8') ? this.layerstack[7].Disable() : this.layerstack[7].Enable();
        if (this.layerstack[8]) Input.isKeyDown('9') ? this.layerstack[8].Disable() : this.layerstack[8].Enable();
        if (this.layerstack[9]) Input.isKeyDown('0') ? this.layerstack[9].Disable() : this.layerstack[9].Enable();


        for (let i = 0; i < this.layerstack.length; i++) {
            if (this.layerstack[i] instanceof Layer && this.layerstack[i].enabled) this.layerstack[i].OnUpdate();
        }
    }

    push_layer(layer) {
        if (!this.layerstack.includes(layer)) this.layerstack.push(layer);
    }

    get_layer(LID) {
        return this.layerstack[LID];
    }

    pop_layer(layer) {
        let index = this.layerstack.indexOf(layer);

        if (index !== -1) { // layer exists!
            this.layerstack.splice(index, 1);
        }
    }
}