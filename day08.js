const input = require("./day08_input");

function findLayerWithLeastZeroes(input, width, height) {

  const pixelsPerLayer = width * height;

  let layers = [];

  for (let i = 0; i < input.length; i += pixelsPerLayer) {

    layers.push(input.substring(i, i + pixelsPerLayer))
  }

  const zerosPerLayer = layers.map(layer => (layer.match(/0/g) || []).length);

  const layerWithLeastZeroes = layers[zerosPerLayer.indexOf(Math.min(...zerosPerLayer))];

  return layerWithLeastZeroes.match(/1/g).length * layerWithLeastZeroes.match(/2/g).length;
};


function decodeText(input, width, height) {

  const pixelsPerLayer = width * height;

  let layers = [];

  for (let i = 0; i < input.length; i += pixelsPerLayer) {

    layers.push(input.substring(i, i + pixelsPerLayer))
  }

  let message = "";

  // iterate over every pixel of image
  for (let i = 0; i < pixelsPerLayer; i++) {
    // iterate over every layer until there is a non-transparent pixel in the current position (i)
    // add that pixel to message
    for (let j = 0; j < layers.length; j++) {
      if (layers[j][i] < 2) {
        message += layers[j][i];
        break;
      }
    }
  }

  // split message into substrings according to width/height properties to display it as an ascii image
  let messageSplit = [];
  for (let i = 0; i < message.length; i += width) {
    messageSplit.push(message.substring(i, i + width))
  }

  return messageSplit
}

console.log(findLayerWithLeastZeroes(input, 25, 6))
console.log(decodeText(input, 25, 6))