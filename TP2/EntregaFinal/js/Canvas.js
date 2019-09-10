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
    this.mouse = {x: 0, y: 0};
    this.mouseDrag = false;
    this.polygons = [];
  }
  
  mousedown(event) {
    event.preventDefault();
    
    this.updateMouse(event);
    
    if (!this.clickedOnVertex()) {
      const polygon = this.getCurrentPolygon();
      
      const vertex = new Vertex(this.mouse.x, this.mouse.y, 5);
      vertex.color = 'rgba(255, 0, 0, 100)';
      
      polygon.addVertex(vertex);
      
      this.draw();
    }
  }
  
  mousemove(event) {
    event.preventDefault();
    this.updateMouse(event);
    
    for (const polygon of this.polygons) {
      for (const vertex of polygon.vertices) {
        if (vertex.mouseOn(this.mouse)) {
          vertex.r = 8;
        } else {
          vertex.r = 5;
        }
      }
    }
    
    if (this.mouseDrag) {
      for (const polygon of this.polygons) {
        for (const vertex of polygon.vertices) {
          if (vertex.dragging) {
            vertex.update(this.mouse);
          }
        }
      }
    }
    
    this.draw();
  }
  
  mouseup(event) {
    event.preventDefault();
    
    for (const polygon of this.polygons) {
      for (const vertex of polygon.vertices) {
        if (vertex.dragging) {
          vertex.dragging = false;
        }
      }
    }
    
    this.mouseDrag = false;
  }
  
  clickedOnVertex() {
    for (const polygon of this.polygons) {
      for (const vertex of polygon.vertices) {
        if (vertex.mouseOn(this.mouse)) {
          vertex.dragging = true;
          this.mouseDrag = true;
          return true;
        }
      }
    }
    return false;
  }
  
  updateMouse(event) {
    this.mouse.x = event.clientX - this.canvas.offsetLeft;
    this.mouse.y = event.clientY - this.canvas.offsetTop;
  }
  
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  addPolygon(polygon) {
    this.polygons.push(polygon);
  }
  
  getCurrentPolygon() {
    let currentPolygon;
    if (this.polygons.length > 0) {
      for (const polygon of this.polygons) {
        if (!polygon.isClosed()) {
          currentPolygon = polygon;
        }
      }
    }
    if (currentPolygon == undefined) {
      currentPolygon = new Polygon(this.ctx);
      this.addPolygon(currentPolygon);
    }
    return currentPolygon;
  }
  
  draw() {
    this.clear();
    if (this.polygons.length > 0) {
      for (const polygon of this.polygons) {
        polygon.draw();
      }
    }
  }
}
