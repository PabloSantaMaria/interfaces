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
  update(x, y) {
    this.x = x;
    this.y = y;
  }
  isClicked(mouseX, mouseY) {
    const dist = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    
    if (dist < this.r) {
      return true;
    } else return false;
  }
}
