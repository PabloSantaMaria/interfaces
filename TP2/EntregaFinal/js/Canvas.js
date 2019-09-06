/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
class Canvas {
  constructor(id, width, height) {
    this.canvas = document.getElementById(id);
    this.canvas.width = width;
    this.canvas.height = height;
    this.polygons = [];
  }
  
  getContext() {
    return this.canvas.getContext('2d');
  }
  addPolygon(polygon) {
    this.polygons.push(polygon);
  }
  draw() {
    // clearRect !!
    this.polygons.forEach(polygon => {
      polygon.draw();
    });
  }
}
