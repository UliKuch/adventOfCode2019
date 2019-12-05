const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,10,23,1,23,6,27,1,6,27,31,1,13,31,35,1,13,35,39,1,39,13,43,2,43,9,47,2,6,47,51,1,51,9,55,1,55,9,59,1,59,6,63,1,9,63,67,2,67,10,71,2,71,13,75,1,10,75,79,2,10,79,83,1,83,6,87,2,87,10,91,1,91,6,95,1,95,13,99,1,99,13,103,2,103,9,107,2,107,10,111,1,5,111,115,2,115,9,119,1,5,119,123,1,123,9,127,1,127,2,131,1,5,131,0,99,2,0,14,0];

function intcode(input) {
  let output = [...input];

  output[1] = 12;
  output[2] = 2;

  for (let c = 0; c < input.length; c += 4) {
    switch (output[c]) {
      case 1:
        output[output[c + 3]] = output[output[c + 1]] + output[output[c + 2]];
        break;
      case 2:
        output[output[c + 3]] = output[output[c + 1]] * output[output[c + 2]];
        break;
      case 99: 
        return output;
    }
  }
};


function intcode2(arr, noun, verb) {
  let output = [...arr];

  output[1] = noun;
  output[2] = verb;

  for (let c = 0; c < arr.length; c += 4) {
    switch (output[c]) {
      case 1:
        output[output[c + 3]] = output[output[c + 1]] + output[output[c + 2]];
        break;
      case 2:
        output[output[c + 3]] = output[output[c + 1]] * output[output[c + 2]];
        break;
      case 99:
        return output[0];
      default:
        return 0;
    }
  }
};


function checkIntcodeOutput(arr) {
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      if (intcode2(arr, x, y) === 19690720) {
        return 100 * x + y;
      }
    }
  }
};


console.log("part 1:", intcode(input));
console.log("part 2:", checkIntcodeOutput(input));