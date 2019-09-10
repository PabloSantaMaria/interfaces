/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
class Polygon {
  constructor(context) {
    this.ctx = context;
    this.closed = false;
    this.centroid;
    this.lineColor = 'yellow';
    this.selectedVertex;
    this.vertices = [];
  }
  
  addVertex(vertex) {
    this.vertices.push(vertex);
  }
  isClosed() {
    return this.closed;
  }
  draw() {
    if (this.vertices.length > 0) {
      for (const vertex of this.vertices) {
        vertex.draw(this.ctx);
      }
    }
    if (this.centroid) {
      this.centroid.draw(this.ctx);
    }
    if (this.vertices.length > 1) {
      this.drawLines();
    }
  }
  drawLines() {
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      this.ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    if (this.isClosed()) {
      this.ctx.closePath();
    }
    this.ctx.stroke();
  }
  close() {
    this.closed = true;
    this.setCentroid();
  }
  setCentroid() {
    let sumX = 0; 
    let sumY = 0;
    for (const vertex of this.vertices) {
      sumX += vertex.x;
      sumY += vertex.y;
    }
    let centroidX = sumX / this.vertices.length;
    let centroidY = sumY / this.vertices.length;
    this.centroid = new Vertex(centroidX, centroidY, 3.5);
    this.centroid.color = '#00FF00';
  }
}
