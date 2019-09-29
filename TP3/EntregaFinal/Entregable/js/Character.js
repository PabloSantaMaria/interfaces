/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-trailing-spaces */

class Character {
  constructor(domId) {
    this.domId = domId;
    this.domElement = document.getElementById(this.domId);
    this.width = this.domElement.getBoundingClientRect().width;
    this.height = this.domElement.getBoundingClientRect().height;
    this.position = {top: this.domElement.getBoundingClientRect().top, left: this.domElement.offsetLeft};
  }

  updatePosition() {
    this.position.top = this.domElement.getBoundingClientRect().top;
    this.position.left = this.domElement.offsetLeft;
  }
}
