/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
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
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
  
  close() {
    let firstNode = this.nodes[0];
    let lastNode = this.nodes[this.nodes.length-1];
    
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(lastNode.x, lastNode.y);
    ctx.lineTo(firstNode.x, firstNode.y);
    ctx.stroke();
    ctx.closePath();
  }

  getCentroid() {
    let sumX = 0; 
    let sumY = 0;
    this.nodes.forEach(node => {
      sumX += node.x;
      sumY += node.y;
    });
    let centroidX = sumX / this.nodes.length;
    let centroidY = sumY / this.nodes.length;
    return new Node(centroidX, centroidY);    
  }
  
  
}
