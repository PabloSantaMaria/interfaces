/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-trailing-spaces */

class Spider extends Character {
  constructor(domId) {
    super(domId);
    this.dropping = false;
  }
  
  init() {
    this.dropping = true;
    setTimeout(() => {
      if (this.dropping) {
        this.domElement.classList.add('sdrop');
        this.drop();
      }
    }, 10000);
  }
  drop() {
    const self = this;
    const timer = setInterval(function() {
      const randomLeft = Math.floor(Math.random() * (600 - 50 + 1) + 50);
      spider.style.left = randomLeft + 'px';
      if (!self.dropping) clearInterval(timer);
    }, 10000);
  }
  stop() {
    this.dropping = false;
    this.domElement.classList.remove('sdrop');
  }
}
