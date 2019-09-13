/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
const c = new Canvas('canvas', 800, 600);
document.onscroll = function() {
  c.scrollTop = document.documentElement.scrollTop;
  c.scrollLeft = document.documentElement.scrollLeft;
};
c.canvas.onmousedown = function(event) {
  c.mouseDown(event);
};
c.canvas.onmousemove = function(event) {
  c.mouseMove(event);
};
c.canvas.onmouseup = function(event) {
  c.mouseUp(event);
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
    c.setBrightness(event);
  }
};

const closeButton = document.getElementById('cerrar');
closeButton.addEventListener('click', function() {
  const polygon = c.getCurrentPolygon();
  if (polygon.vertices.length >= 3) {
    polygon.close();
    c.draw();
  }
});
