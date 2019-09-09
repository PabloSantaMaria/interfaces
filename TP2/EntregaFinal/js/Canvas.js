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
    this.mouse = {x: 0, y: 0};
  }
  
  
  mousedown(event) {
    event.preventDefault();
    event.stopPropagation();
    const mouseX = event.clientX - this.canvas.offsetLeft;
    const mouseY = event.clientY - this.canvas.offsetTop;
    
    for (let i = 0; i < this.polygons.length; i++) {
      const polygon = this.polygons[i];
      for (let j = 0; j < polygon.vertices.length; j++) {
        const vertex = polygon.vertices[j];
        if (vertex.isClicked(mouseX, mouseY)) {
          vertex.dragging = true;
          console.log(vertex);
        }
      }
    }
  }
  
  click(event) {
    event.preventDefault();
    event.stopPropagation();
    const mouseX = event.clientX - this.canvas.offsetLeft;
    const mouseY = event.clientY - this.canvas.offsetTop;
    
    // let clickedPolygon;
    // for (let i = 0; i < this.polygons.length; i++) {
    //   clickedPolygon = this.polygons[i].isClicked(mouseX, mouseY);
    // }
    // if (clickedPolygon) {
    //   if (clickedPolygon.selectedVertex != null) {
    //     clickedPolygon.selectedVertex.color = 'blue';
    //     clickedPolygon.selectedVertex.dragging = true;
    //     // clickedPolygon.selectedVertex.update(this.mouse.x, this.mouse.y);
    
    //   }
    // }
    
    
    const polygon = this.getCurrentPolygon();
    
    const vertex = new Vertex(mouseX, mouseY, 5);
    vertex.color = 'rgba(255, 0, 0, 100)';
    
    polygon.addVertex(vertex);
    
    
    this.draw();
  }
  
  mousemove(event) {
    event.preventDefault();
    event.stopPropagation();
    const mouseX = event.clientX - this.canvas.offsetLeft;
    const mouseY = event.clientY - this.canvas.offsetTop;

    for (let i = 0; i < this.polygons.length; i++) {
      const polygon = this.polygons[i];
      for (let j = 0; j < polygon.vertices.length; j++) {
        const vertex = polygon.vertices[j];
        if (vertex.dragging) {
          vertex.update(mouseX, mouseY);
        }
      }
    }

    this.draw();
  }
  mouseup(event) {
    event.preventDefault();
    event.stopPropagation();
    for (let i = 0; i < this.polygons.length; i++) {
      const polygon = this.polygons[i];
      for (let j = 0; j < polygon.vertices.length; j++) {
        const vertex = polygon.vertices[j];
        if (vertex.dragging) {
          vertex.dragging = false;
        }
      }
    }
  }
  
  clickOnVertex(mouseX, mouseY) {
    for (let i = 0; i < this.polygons.length; i++) {
      if (this.polygons[i].isClicked(mouseX, mouseY)) {
        return true;
      }
    }
    return false;
  }
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  addPolygon(polygon) {
    this.polygons.push(polygon);
  }
  getCurrentPolygon() {
    let currentPolygon;
    this.polygons.forEach((polygon) => {
      if (!polygon.isClosed()) {
        currentPolygon = polygon;
      }
    });
    if (currentPolygon == undefined || this.polygons.length == 0) {
      currentPolygon = new Polygon(this.ctx);
      this.addPolygon(currentPolygon);
    }
    return currentPolygon;
  }
  draw() {
    this.clear();
    if (this.polygons.length > 0) {
      this.polygons.forEach((polygon) => {
        polygon.draw();
      });
    }
  }
}
