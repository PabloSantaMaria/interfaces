/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-trailing-spaces */

class Zombie extends Character {
  constructor(domId) {
    super(domId);
    // this.init();
  }

  init() {
    this.domElement.classList.add('zanimate');
    setTimeout(() => {
      this.domElement.classList.add('zmove');
    }, 5000);
  }
  stop() {
    this.domElement.classList.remove('zmove');
  }
}
