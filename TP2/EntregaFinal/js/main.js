window.addEventListener('DOMContentLoaded', (event) => {
  /**
   * Se crea el objeto Canvas que va a instanciar y manejar a todos los vértices y polígonos
   */
  const c = new Canvas('canvas', 800, 600);
  /**
   * Ajusta la posición del mouse si se realizó scroll en la ventana
   */
  document.onscroll = function() {
    c.scrollTop = document.documentElement.scrollTop;
    c.scrollLeft = document.documentElement.scrollLeft;
  };
  /**
   * Llama a handler cuando se hace click
   */
  c.canvas.onmousedown = function(event) {
    c.mouseDown(event);
  };
  /**
   * Llama a handler cuando se mueve el mouse
   */
  c.canvas.onmousemove = function(event) {
    c.mouseMove(event);
  };
  /**
   * Llama a handler cuando se levanta el botón del mouse
   */
  c.canvas.onmouseup = function(event) {
    c.mouseUp(event);
  };
  /**
   * Llama a handler cuando se hace doble click
   */
  c.canvas.ondblclick = function(event) {
    c.deleteVertex(event);
  };
  /**
   * Chequea que la tecla presionada haya sido la "c"
   * Setea boolean true en canvas de c presionada
   */
  document.onkeydown = function(event) {
    if (event.keyCode === 67) {
      c.keyPressed = true;
    }
  };
  /**
   * Chequea que la tecla levantada haya sido la "c"
   * Setea boolean false en canvas de c presionada
   */
  document.onkeyup = function(event) {
    if (event.keyCode === 67) {
      c.keyPressed = false;
    }
  };
  /**
   * Llama a handler cuando se usa la rueda del mouse
   */
  document.onwheel = function wheel(event) {
    if (c.keyPressed) {
      c.setBrightness(event);
    }
  };
  /**
   * Escucha al botón cerrar
   * Cierra el polígono actual y redibuja todo el canvas
   */
  const closeButton = document.getElementById('cerrar');
  closeButton.addEventListener('click', function() {
    const polygon = c.getCurrentPolygon();
    if (polygon.vertices.length >= 3) {
      polygon.close();
      c.draw();
    }
  });
});
