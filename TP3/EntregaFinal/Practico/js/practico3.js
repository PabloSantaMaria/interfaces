/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-trailing-spaces */

window.addEventListener('DOMContentLoaded', (event) => {

  // Ejercicio 2
  const divTransform = document.getElementById('transform');
  
  const properties = {
    translateX: 'px',
    translateY: 'px',
    rotateX: 'deg',
    rotateY: 'deg',
    skewX: 'deg',
    skewY: 'deg',
  };
  
  divTransform.onclick = function() {
    const propKeys = Object.keys(properties);
    const index = Math.floor(Math.random() * propKeys.length);
    const property = propKeys[index];
    const unit = properties[property];
    const amount = Math.floor(Math.random() * 50 + 1);
    const randomStyle = 'transform: ' + property + '(' + amount + unit + ')';
    
    divTransform.style = randomStyle;
  };
  
  // Ejercicio 3
  const actualTime = document.getElementById('time');
  
  (function updateTime() {
    const date = new Date();
    actualTime.innerHTML = date.getHours() + ':' + (date.getMinutes() < 10 ? '0':'') + date.getMinutes();
    setTimeout(updateTime, 60000);
  })();
  
  const date = new Date();
  const min = (date.getMinutes() / 60) * 360;
  const hour = (date.getHours() / 12) * 360;
  
  insertKeyframes('minutes', min);
  insertKeyframes('hours', hour);
  
  function insertKeyframes(animation, hand) {
    const style = document.createElement('style');
    style.type = 'text/css';
    const keyframes = '\@keyframes ' + animation + 
                      ' {\ 0% {\ transform: rotate(' + hand + 'deg);\ }\ 100% {\ transform: rotate('+hand+360+
                      ');\ }\ }\ }';
    style.innerHTML = keyframes;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  
  // Ejercicio 5
  const area = document.getElementById('area');
  const sprite = document.getElementById('spriteMove');

  area.onmousemove = function(event) {
    moveSprite(event);
  };
  
  function moveSprite(event) {
    event.preventDefault();
    
    const mouseX = event.layerX - sprite.offsetLeft;
    const mouseY = event.layerY - sprite.offsetTop;
    
    sprite.style = 'transform: translate(' + mouseX + 'px, ' + mouseY + 'px)';
  }
});
