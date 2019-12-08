const input = require("./day08_input");

function findLayer(input, width, height) {

  const pixelsPerLayer = width * height;

  let layers = [];

  for (let i = 0; i < input.length; i += pixelsPerLayer) {

    layers.push(input.substring(i, i + pixelsPerLayer))
  }

  const zerosPerLayer = layers.map(layer => (layer.match(/0/g) || []).length);

  const layerWithLeastZeroes = layers[zerosPerLayer.indexOf(Math.min(...zerosPerLayer))];


  return layerWithLeastZeroes.match(/1/g).length * layerWithLeastZeroes.match(/2/g).length;

};

console.log(findLayer(input, 25, 6))