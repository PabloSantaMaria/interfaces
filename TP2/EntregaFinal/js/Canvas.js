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
  /**
   * Imprime en la consola la posición del último click
   */
  logClick() {
    console.log('Click en canvas! x: ' + this.mouse.x + ', y: ' + this.mouse.y);
  }
  /**
   * Actualiza el objeto mouse
   * Toma en cuenta el área del canvas y el scroll de la página
   * @param event evento que tiene la posición actualizada del mouse
   */
  updateMousePosition(event) {
    const canvasArea = this.canvas.getBoundingClientRect();
    
    const mouseX = event.pageX - canvasArea.left - this.scrollLeft;
    const mouseY = event.pageY - canvasArea.top - this.scrollTop;

    this.mouse.x = mouseX;
    this.mouse.y = mouseY;
  }
  /**
   * Guarda el estado del mouse cuando comienza un evento de drag
   */
  updateMouseDrag() {
    this.mouse.dragStartX = this.mouse.x;
    this.mouse.dragStartY = this.mouse.y;
  }
  /**
   * Comportamiento cuando se hace un click
   * Guarda el estado si empieza un drag
   * Chequea si se hizo click sobre algún vértice o centroide
   * Si no es así, crea un nuevo vértice sobre el polígono que se está creando o crea uno nuevo
   * Redibuja
   * @param event evento que trae las coordenadas del click
   */
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
  /**
   * Actualiza el objeto mouse
   * Chequea si el mouse pasa por algún vértice o centroide para cambiar el estilo
   * Si se está realizando un drag, chequea si es sobre todo un polígono (centroide)
   * o sobre un vértice y llama a la función drag que corresponde a cada objeto
   * Guarda el estado al comenzar el drag
   * Redibuja
   * @param event evento que trae la posición del mouse al moverse 
   */
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
  /**
   * Recorre todos los polígonos y sus vértices
   * Setea el boolean dragging en false a todos
   * @param event evento que trae la posición de cuando se levanta el botón del mouse
   */
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
  /**
   * Cambia el brillo de las figuras cerradas
   * Asigna dirección de la rueda del mouse
   * Aumenta o disminuye la intensidad en pasos de 10 unidades
   * Asigna topes entre 0 y 255
   * Redibuja
   * @param event evento que trae la informacíon de la rueda del mouse
   */
  setBrightness(event) {
    let direction;
    event.deltaY > 0 ? direction = -10 : direction = 10;
    
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
  /**
   * Devuelve true si el mouse hizo click sobre algún vértice o centroide
   * Setea booleans true para indicar dragging
   */
  clickedOnVertex() {
    for (const polygon of this.polygons) {
      if (polygon.closed && polygon.centroid) {
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
  /**
   * Chequea si se hizo doble click en algún vértice
   * Pasa como parámetro el vértice clickeado al polígono correspondiente
   * Redibuja
   * @param event evento que trae coordenadas del doble click
   */
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
  /**
   * Borra el canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  /**
   * Agrega un polígono al arreglo de polígonos
   * @param polygon objeto polígono
   */
  addPolygon(polygon) {
    this.polygons.push(polygon);
  }
  /**
   * Devuelve el polígono sobre el que se está trabajando (está abierto)
   * Si no existe, crea uno nuevo
   */
  getCurrentPolygon() {
    let currentPolygon;
    if (this.polygons.length > 0) {
      for (const polygon of this.polygons) {
        if (!polygon.closed) {
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
  /**
   * Borra el canvas y redibuja todos los polígonos
   */
  draw() {
    this.clear();
    if (this.polygons.length > 0) {
      for (const polygon of this.polygons) {
        polygon.draw();
      }
    }
  }
}
