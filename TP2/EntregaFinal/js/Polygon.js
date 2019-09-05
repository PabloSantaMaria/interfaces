/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
class Polygon {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.nodes.forEach(node => {
      node.draw();
    });
    
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      let nextNode = this.nodes[i+1];
      if (nextNode != undefined) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.strokeStyle = 'yellow';
        ctx.stroke();
      }
      
    }
  }
}
