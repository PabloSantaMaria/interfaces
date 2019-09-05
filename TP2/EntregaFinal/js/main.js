/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');
const polygon = new Polygon();

canvas.addEventListener('click', function(event) {
  let x = event.clientX;
  let y = event.clientY;
  console.log('Click en canvas! Coordenadas: ' + x + ', ' + y);

  let node = new Node(x, y, 10);
  node.color = 'red';
  // node.draw();
  polygon.addNode(node);
  polygon.draw();
  // polygon.joinNodes();

});
