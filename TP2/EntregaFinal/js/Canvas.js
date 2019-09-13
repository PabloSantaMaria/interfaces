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
    this.mouse = {x: 0, y: 0, dragStartX: 0, dragStartY: 0};
    this.mouseDrag = false;
    this.keyPressed = false;
    this.scrollTop = 0;
    this.scrollLeft = 0;
  }
  
  logClick() {
    console.log('Click en canvas! x: ' + this.mouse.x + ', y: ' + this.mouse.y);
  }
  
  updateMousePosition(event) {
    const canvasArea = this.canvas.getBoundingClientRect();
    
    const mouseX = event.pageX - canvasArea.left - this.scrollLeft;
    const mouseY = event.pageY - canvasArea.top - this.scrollTop;

    this.mouse.x = mouseX;
    this.mouse.y = mouseY;

  }
  updateMouseDrag() {
    this.mouse.dragStartX = this.mouse.x;
    this.mouse.dragStartY = this.mouse.y;
  }
  mouseDown(event) {
    event.preventDefault();
    this.updateMousePosition(event);
    this.updateMouseDrag();

    this.logClick();
       
    if (!this.clickedOnVertex()) {
      const polygon = this.getCurrentPolygon();
      const vertex = new Vertex(this.mouse.x, this.mouse.y, 5);
      polygon.addVertex(vertex);
      
      this.draw();
    }
  }
  mouseMove(event) {
    event.preventDefault();
    this.updateMousePosition(event);
    
    for (const polygon of this.polygons) {
      if (polygon.closed) {
        const centroid = polygon.centroid;
        if (centroid.mouseOn(this.mouse)) {
          centroid.hover = true;
        } else {
          centroid.hover = false;
        }
      }
      for (const vertex of polygon.vertices) {
        if (vertex.mouseOn(this.mouse)) {
          vertex.hover = true;
        } else {
          vertex.hover = false;
        }
      }
    }
    
    if (this.mouseDrag) {
      for (const polygon of this.polygons) {
        if (polygon.dragging) {
          polygon.drag(this.mouse);
        }
        for (const vertex of polygon.vertices) {
          if (vertex.dragging) {
            vertex.update(this.mouse);
          }
        }
      }
    }
    this.updateMouseDrag();
    this.draw();
  }
  
  mouseUp(event) {
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
    this.updateMousePosition(event);
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
