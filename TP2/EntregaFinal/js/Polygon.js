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
    this.selectedVertex;
    this.vertices = [];
  }
  
  addVertex(vertex) {
    this.vertices.push(vertex);
  }
  isClosed() {
    return this.closed;
  }
  isClicked(mouseX, mouseY) {
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].isClicked(mouseX, mouseY)) {
        this.selectedVertex = this.vertices[i];
        return this;
      }
    }
    return null;
  }
  draw() {
    if (this.vertices.length > 0) {
      this.vertices.forEach((vertex) => {
        vertex.draw(this.ctx);
      });
    }
    if (this.centroid) {
      this.centroid.draw(this.ctx);
    }
    this.drawLines();
  }
  drawLines() {
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      this.ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    if (this.isClosed()) {
      this.ctx.closePath();
    }
    this.ctx.stroke();
    
    // for (let i = 0; i < this.vertices.length; i++) {
      
    //   let vertex = this.vertices[i];
    //   let nextVertex = this.vertices[i+1];
      
    //   if (nextVertex != undefined) {
    //     this.line(vertex.x, vertex.y, nextVertex.x, nextVertex.y);
    //   }
    // }
    // if (this.closed) {
    //   let firstVertex = this.vertices[0];
    //   let lastVertex = this.vertices[this.vertices.length-1];
      
    //   this.line(lastVertex.x, lastVertex.y, firstVertex.x, firstVertex.y);
    // }
  }
  line(x1, y1, x2, y2) {
    this.ctx.strokeStyle = 'yellow';
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  close() {
    this.closed = true;
    this.setCentroid();
  }
  setCentroid() {
    let sumX = 0; 
    let sumY = 0;
    this.vertices.forEach((vertex) => {
      sumX += vertex.x;
      sumY += vertex.y;
    });
    let centroidX = sumX / this.vertices.length;
    let centroidY = sumY / this.vertices.length;
    this.centroid = new Vertex(centroidX, centroidY, 3.5);
    this.centroid.color = '#00FF00';
  }
}
