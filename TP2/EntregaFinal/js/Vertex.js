class Vertex {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = 'rgb(200, 0, 0)';
    this.hoverColor = 'rgb(255, 30, 0)';
    this.hoverRadius = 3;
    this.dragging = false;
    this.hover = false;
  }

  /**
   * Dibuja un vértice y cambia el radio y el color si el mouse se encuentra sobre el mismo
   * @param ctx contexto 
   */
  draw(ctx) {
    let radius;
    let color;
    if (this.hover) {
      radius = this.r + this.hoverRadius;
      color = this.hoverColor;
    } else {
      radius = this.r;
      color = this.color;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  /**
   * Actualiza la posición del vértice de acuerdo al mouse
   * @param mouse objeto con coordenadas
   */
  update(mouse) {
    this.x = mouse.x;
    this.y = mouse.y;
  }
  /**
   * Devuelve true si el mouse está sobre el vértice
   * @param mouse objeto mouse
   */
  mouseOn(mouse) {
    const dist = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2);
    return dist < this.r;
  }
}
