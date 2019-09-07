/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
const c = new Canvas('canvas', 800, 600);
c.canvas.addEventListener('click', function(event) {
  c.click(event);
});

const closeButton = document.getElementById('cerrar');
closeButton.addEventListener('click', function() {
  const polygon = c.getCurrentPolygon();
  polygon.close();
  polygon.setCentroid();
  polygon.centroid.draw(c.ctx);
});
