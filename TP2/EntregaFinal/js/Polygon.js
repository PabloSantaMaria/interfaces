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
  /**
   * Agrega un vértice al arreglo de vértices
   * @param vertex 
   */
  addVertex(vertex) {
    this.vertices.push(vertex);
  }
  /**
   * Borra el vértice pasado como parámetro del arreglo de vértices (si existe)
   * @param vertexToDelete 
   */
  deleteVertex(vertexToDelete) {
    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i];
      if (vertex === vertexToDelete) {
        this.vertices.splice(i, 1);
      }
    }
  }
  /**
   * Dibuja los vértices y el centroide. Llama a dibujar líneas si hay más de 1 vértice
   */
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
      this.setCentroid();
      this.centroid.draw(this.ctx);
    }
  }
  /**
   * Dibuja líneas entre vértices recorriendo los centros de los vértices. Si está cerrado cierra el path con el primer vértice
   */
  drawLines() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      this.ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    if (this.closed) {
      this.ctx.closePath();
      this.ctx.fillStyle = 'rgb(0, 0, ' + this.brightness + ')';
      this.ctx.fill();
    }
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
  /**
   * Cierra el polígono y llama a setear su centroide
   */
  close() {
    this.closed = true;
    this.setCentroid();
  }
  /**
   * Calcula el centroide.
   * Nota: los polígonos irregulares no tienen un "centro", ya que puede ser que no haya un punto equidistante
   * entre todos los vértices. Sin embargo pueden tener un "centro de gravedad" o "centroide", y es posible que 
   * éste se encuentre fuera de la figura
   */
  setCentroid() {
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
      this.centroid.color = 'rgb(0, 200, 0)';
      this.centroid.hoverColor = 'rgb(0, 255, 100)';
    }
  }
  /**
   * Actualiza la posición de los vértices de acuerdo al delta entre la posición anterior y alcual del mouse
   * @param mouse objeto mouse que contiene el estado actual y el estado antes de comenzar el drag
   */
  drag(mouse) {
    for (const vertex of this.vertices) {
      vertex.x += mouse.x - mouse.dragStartX;
      vertex.y += mouse.y - mouse.dragStartY;
    }
  }
}
