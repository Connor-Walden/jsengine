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
    if(fill) {
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
    if(uv) {
      this.context.drawImage(img, uv.x, uv.y, uv.w, uv.h, pos.x, pos.y, pos.w, pos.h);
    } else {
      this.context.drawImage(img, pos.x, pos.y, pos.w, pos.h);
    }
  }
}
