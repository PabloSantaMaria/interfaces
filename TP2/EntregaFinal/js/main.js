/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
const c = new Canvas('canvas', 800, 600);

c.canvas.onmousedown = function(event) {
  c.mousedown(event);
};
c.canvas.onmousemove = function(event) {
  c.mousemove(event);
};
c.canvas.onmouseup = function(event) {
  c.mouseup(event);
};
c.canvas.ondblclick = function(event) {
  c.deleteVertex(event);
};
document.onkeydown = function(event) {
  if (event.keyCode === 67) {
    c.keyPressed = true;
  }
};
document.onkeyup = function(event) {
  if (event.keyCode === 67) {
    c.keyPressed = false;
  }
};
document.onwheel = function wheel(event) {
  if (c.keyPressed) {
    c.changeColor(event);
  }
  
};

const closeButton = document.getElementById('cerrar');
closeButton.addEventListener('click', function() {
  const polygon = c.getCurrentPolygon();
  polygon.close();
  c.draw();
});
