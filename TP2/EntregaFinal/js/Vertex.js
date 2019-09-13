/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
class Vertex {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = 'rgb(200, 0, 0)';
    this.hoverColor = 'rgb(255, 0, 0)';
    this.hoverRadius = 3;
    this.dragging = false;
    this.hover = false;
  }

  draw(ctx) {
    let radius;
    let color;
    if (this.hover) {
      radius = this.r + this.hoverRadius;
      color = this.hoverColor;
    } else {
      radius = this.r;
      color = this.color;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
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
