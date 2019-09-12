/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
class Polygon {
  constructor(context) {
    this.ctx = context;
    this.vertices = [];
    this.centroid;
    this.lineColor = 'rgb(255, 255, 0)';
    this.brightness = 127;
    this.closed = false;
    this.dragging = false;
  }
  
  addVertex(vertex) {
    this.vertices.push(vertex);
  }
  deleteVertex(vertexToDelete) {
    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i];
      if (vertex === vertexToDelete) {
        this.vertices.splice(i, 1);
      }
    }
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
    if (this.vertices.length > 1) {
      this.drawLines();
    }
    if (this.centroid) {
      this.getCentroid();
      this.centroid.draw(this.ctx);
    }
  }
  drawLines() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      this.ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    if (this.isClosed()) {
      this.ctx.closePath();
      this.ctx.fillStyle = 'rgb(0, 0, ' + this.brightness + ')';
      this.ctx.fill();
    }
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.stroke();
  }
  close() {
    this.closed = true;
    this.getCentroid();
  }
  getCentroid() {
    let sumX = 0; 
    let sumY = 0;
    for (const vertex of this.vertices) {
      sumX += vertex.x;
      sumY += vertex.y;
    }
    let centroidX = sumX / this.vertices.length;
    let centroidY = sumY / this.vertices.length;

    if (this.centroid) {
      this.centroid.x = centroidX;
      this.centroid.y = centroidY;
    } else {
      this.centroid = new Vertex(centroidX, centroidY, 3.5);
      this.centroid.color = 'rgb(0, 255, 0)';
    }
  }
  drag(startx, starty, mouse) {
    
    for (const vertex of this.vertices) {

      vertex.x = vertex.x + (mouse.x - startx);
      vertex.y = vertex.y + (mouse.y - starty);

    }
  }
}
