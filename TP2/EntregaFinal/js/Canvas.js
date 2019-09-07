/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
class Canvas {
  constructor(id, width, height) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.polygons = [];
  }
  
  click(event) {
    let polygon = this.getCurrentPolygon();
    
    let x = event.clientX;
    let y = event.clientY;
    console.log('Click en canvas! Coordenadas: ' + x + ', ' + y);
    
    let vertex = new Vertex(x, y, 5);
    vertex.color = '#FF0000';

    polygon.addVertex(vertex);
    this.draw();
  }
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  addPolygon(polygon) {
    this.polygons.push(polygon);
  }
  getCurrentPolygon() {
    let currentPolygon;
    if (this.polygons.length == 0) {
      currentPolygon = new Polygon(this.ctx);
      this.addPolygon(currentPolygon);
    } else {
      this.polygons.forEach(polygon => {
        if (!polygon.isClosed()) {
          currentPolygon = polygon;
        }
      });
    }
    if (currentPolygon == undefined) {
      currentPolygon = new Polygon(this.ctx);
      this.addPolygon(currentPolygon);
    }

    console.log(currentPolygon);
    
    return currentPolygon;
  }
  draw() {
    this.clear();
    if (this.polygons.length > 0) {
      this.polygons.forEach(polygon => {
        polygon.draw(this.ctx);
      });
    }
  }
}
