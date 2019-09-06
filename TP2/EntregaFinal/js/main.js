/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
const c = new Canvas('canvas', 400, 400);

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
  node.color = '#FF0000';
  // node.draw();
  polygon.addNode(node);
  polygon.draw();
  // polygon.joinNodes();

});

let close = document.getElementById('cerrar');
close.addEventListener('click', function() {
  polygon.close();
  let centroid = polygon.getCentroid();
  console.log(centroid);
  
  centroid.color = 'green';
  centroid.r = 7;
  console.log(centroid);
  centroid.draw();
  
  
});
