/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
class Canvas {
  constructor(id, width, height) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.polygons = [];
    this.mouse = {x: 0, y: 0};
    this.mouseDrag = false;
    this.keyPressed = false;
    this.dragStartX;
    this.dragStartY;
    this.scrollTop = 0;
  }
  
  logClick() {
    console.log('Click en canvas! x: ' + this.mouse.x + ', y: ' + this.mouse.y);
  }
  
  updateMouse(event) {
    const canvasArea = this.canvas.getBoundingClientRect();
    
    const mouseX = event.pageX - canvasArea.left;
    const mouseY = event.pageY - canvasArea.top - this.scrollTop;

    this.mouse.x = mouseX;
    this.mouse.y = mouseY;

  }
  
  mousedown(event) {
    event.preventDefault();
    this.updateMouse(event);
    this.logClick();
    
    this.dragStartX = this.mouse.x;
    this.dragStartY = this.mouse.y;
       
    if (!this.clickedOnVertex()) {
      const polygon = this.getCurrentPolygon();
      
      const vertex = new Vertex(this.mouse.x, this.mouse.y, 5);
      
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
        if (polygon.dragging) {
          polygon.drag(this.dragStartX, this.dragStartY, this.mouse);
        }
        for (const vertex of polygon.vertices) {
          if (vertex.dragging) {
            vertex.update(this.mouse);
          }
        }
      }
    }
    this.dragStartX = this.mouse.x;
    this.dragStartY = this.mouse.y;
    this.draw();
  }
  
  mouseup(event) {
    event.preventDefault();
    
    for (const polygon of this.polygons) {
      if (polygon.dragging) {
        polygon.dragging = false;
      }
      for (const vertex of polygon.vertices) {
        if (vertex.dragging) {
          vertex.dragging = false;
        }
      }
    }
    
    this.mouseDrag = false;
  }
  
  setBrightness(event) {
    let direction;
    event.deltaY > 0 ? direction = -20 : direction = 20;
    
    for (const polygon of this.polygons) {
      if (polygon.closed) {
        let brightness = polygon.brightness += direction;
        if (brightness < 0) {
          brightness = 0;
        } 
        if (brightness > 255) {
          brightness = 255;
        }
        polygon.brightness = brightness;
      }
    }
    this.draw();
  }
  
  clickedOnVertex() {
    for (const polygon of this.polygons) {
      if (polygon.isClosed() && polygon.centroid) {
        const centroid = polygon.centroid;
        if (centroid.mouseOn(this.mouse)) {
          polygon.dragging = true;
          this.mouseDrag = true;
          return true;
        }
      }
      
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
  
  deleteVertex(event) {
    this.updateMouse(event);
    for (const polygon of this.polygons) {
      for (const vertex of polygon.vertices) {
        if (vertex.mouseOn(this.mouse)) {
          polygon.deleteVertex(vertex);
        }
      }
    }
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
