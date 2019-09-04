/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
window.addEventListener('DOMContentLoaded', (event) => {
  function punto1() {
    let showMatrix = document.getElementById('showMatrix');
    let results = document.getElementById('results');
    let matrix = createMatrix(10, 10);

    puntoA(matrix);
    puntoB(matrix);
    puntoC(matrix);

    function createMatrix(rows, cols) {
      let matrix = [];
      for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(cols);
        let row = document.createElement('TR');
        let rowIndex = document.createElement('TD');
        rowIndex.innerText = 'Fila ' + i;
        row.appendChild(rowIndex);
        for (let j = 0; j < cols; j++) {
          let entero = Math.floor(Math.random() * 100);
          matrix[i][j] = entero;
          let td = document.createElement('TD');
          td.innerHTML = entero;
          row.appendChild(td);
        }
        showMatrix.appendChild(row);
      }
      return matrix;
    }

    function puntoA(matrix) {
      let max = matrix[0][0];
      let rowMax;
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] > max) {
            max = matrix[i][j];
            rowMax = i;
          }
        }
      }
      let p = document.createElement('P');
      p.innerHTML = 'El elemento mayor de toda la matriz es ' + max + ' (fila ' + rowMax + ')';
      results.appendChild(p);
    }

    function puntoB(matrix) {
      for (let row = 0; row < matrix.length; row++) {
        let li = document.createElement('LI');
        let elem = matrix[row][0];

        for (let i = 0; i < matrix[row].length; i++) {
          if (row % 2 == 0) {
            if (matrix[row][i] > elem) {
              elem = matrix[row][i];
              li.innerText = 'El elemento mayor de la fila ' + row + ' es ' + elem;
            }
          } else {
            if (matrix[row][i] < elem) {
              elem = matrix[row][i];
              li.innerText = 'El elemento menor de la fila ' + row + ' es ' + elem;
            }
          }
        }
        results.appendChild(li);
      }
    }

    function puntoC(matrix) {
      let avg = [];
      for (let row = 0; row < matrix.length; row++) {
        let sum = 0;
        for (let col = 0; col < matrix[row].length; col++) {
          sum += matrix[row][col];
        }
        avg.push(Math.round(sum/matrix[row].length));
      }
      let p = document.createElement('P');
      p.innerHTML = 'Arreglo de promedios: ' + '[' + avg.toString() + ']';
      results.appendChild(p);
    }
  }

  function punto2() {
    let canvas = setupCanvas('punto2', 500, 300);
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(0, 0, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function punto3() {
    let canvas = setupCanvas('punto3', 500, 300);
    let ctx = canvas.getContext('2d');

    let imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        setPixel(imageData, x, y, 255, 255, 0, 255);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function punto4() {
    let canvas = setupCanvas('punto4', 500, 300);
    let ctx = canvas.getContext('2d');

    let imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        let color = parseInt((y/imageData.height) * 255);
        setPixel(imageData, x, y, color, color, color, 255);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function punto5() {
    let canvas = setupCanvas('punto5', 500, 300);
    let ctx = canvas.getContext('2d');

    let imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width/2; x++) {
        let r = parseInt((x / (imageData.width/2)) * 255);
        let g = parseInt((x / (imageData.width/2)) * 255);
        let b = 0;
        let a = 255;
        setPixel(imageData, x, y, r, g, b, a);
      }
    }
    for (let y = 0; y < imageData.height; y++) {
      for (let x = imageData.width/2; x < imageData.width; x++) {
        let r = 255;
        let g = parseInt(((imageData.width - x) / x) * 255);
        let b = 0;
        let a = 255;
        setPixel(imageData, x, y, r, g, b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function punto6() {
    let canvas = setupCanvas('punto6', 600, 600);
    let ctx = canvas.getContext('2d');
    canvas.addEventListener('click', greyscale);

    let img = new Image();
    img.src = './exactas.jpg';
    img.crossorigin = 'anonymous';

    img.onload = function() {
      let width = canvas.width;
      let imgWidth = img.naturalWidth;
      let imgHeight = img.naturalHeight;
      let aspectRatio = imgWidth / imgHeight;
      let height = width / aspectRatio;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
    };

    function greyscale() {
      let imgData = ctx.getImageData(0, 0, img.width, img.height);
      let pixels = imgData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        let sum = pixels[i] + pixels[i+1] + pixels[i+2];
        let avg = parseInt(sum/3);
        pixels[i] = avg;
        pixels[i+1] = avg;
        pixels[i+2] = avg;
      }
      imgData.data = pixels;
      ctx.putImageData(imgData, 0, 0);
    }
  }

  function setupCanvas(canvasId, width, height) {
    let canvas = document.getElementById(canvasId);
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
  }

  punto1();
  punto2();
  punto3();
  punto4();
  punto5();
  punto6();
});
