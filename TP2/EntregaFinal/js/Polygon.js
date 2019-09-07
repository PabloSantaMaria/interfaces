/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
class Polygon {
  constructor(context) {
    this.ctx = context;
    this.closed = false;
    this.centroid = null;
    this.vertices = [];
  }
  
  addVertex(vertex) {
    this.vertices.push(vertex);
  }
  isClosed() {
    return this.closed;
  }
  draw() {
    this.vertices.forEach(vertex => {
      vertex.draw(this.ctx);
    });
    
    // refactor
    for (let i = 0; i < this.vertices.length; i++) {
      let vertex = this.vertices[i];
      let nextVertex = this.vertices[i+1];
      if (nextVertex != undefined) {
        this.ctx.strokeStyle = 'yellow';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(vertex.x, vertex.y);
        this.ctx.lineTo(nextVertex.x, nextVertex.y);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }
  close() {
    let firstVertex = this.vertices[0];
    let lastVertex = this.vertices[this.vertices.length-1];
    
    // refactor
    this.ctx.strokeStyle = 'yellow';
    this.ctx.beginPath();
    this.ctx.moveTo(lastVertex.x, lastVertex.y);
    this.ctx.lineTo(firstVertex.x, firstVertex.y);
    this.ctx.stroke();
    this.ctx.closePath();

    this.closed = true;
  }
  setCentroid() {
    let sumX = 0; 
    let sumY = 0;
    this.vertices.forEach(vertex => {
      sumX += vertex.x;
      sumY += vertex.y;
    });
    let centroidX = sumX / this.vertices.length;
    let centroidY = sumY / this.vertices.length;

    this.centroid = new Vertex(centroidX, centroidY, 3.5);
    this.centroid.color = 'green';
  }
}
