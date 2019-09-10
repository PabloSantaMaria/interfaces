/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
class Vertex {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = '';
    this.dragging = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  }
  update(mouse) {
    this.x = mouse.x;
    this.y = mouse.y;
  }
  mouseOn(mouse) {
    const dist = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2);
    return dist < this.r;
  }
}
