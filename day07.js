const input = [3,8,1001,8,10,8,105,1,0,0,21,34,43,64,85,98,179,260,341,422,99999,3,9,1001,9,3,9,102,3,9,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,1001,9,2,9,1002,9,4,9,1001,9,3,9,1002,9,4,9,4,9,99,3,9,1001,9,3,9,102,3,9,9,101,4,9,9,102,3,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99];
const testInput1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
const testInput2 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
const testInput3 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
const testInput4 = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

const { Intcode } = require("./day05")

function calcHighestSignal(input) {
  let signalList = [];

  // set up amps
  const ampA = new Intcode(input),
        ampB = new Intcode(input),
        ampC = new Intcode(input),
        ampD = new Intcode(input),
        ampE = new Intcode(input);

  // check all possible amp-phase combinations (avoiding same phase for different amps)
  // and push resulting signals into signal list
  for (let a = 5; a < 10; a++) {
    for (let b = 5; b < 10; b++) {
      if (a === b) {
        continue
      }
      for (let c = 5; c < 10; c++) {
        if (a === c || b === c) {
          continue
        }
        for (let d = 5; d < 10; d++) {
          if (a === d || b === d || c === d) {
            continue
          }
          for (let e = 5; e < 10; e++) {
          if (a === e || b === e || c === e || d === e) {
            continue
          }
          let count = 0;

          // reset amps on each iteration
          ampA.program = input;
          ampB.program = input;
          ampC.program = input;
          ampD.program = input;
          ampE.program = input;
          ampA.resetOutput();
          ampB.resetOutput();
          ampC.resetOutput();
          ampD.resetOutput();
          ampE.resetOutput();
          
          // as long as the intcode program is not finished...
          while (!ampA.finished) {
            // ... run intcode on amps: on first iteration with amp phase and first input signal,
            // on second only with input signal
            (count === 0) ? ampA.calcOutput(a, 0) : ampA.calcOutput(ampE.output[ampE.output.length - 1]);
            (count === 0) ? ampB.calcOutput(b, ampA.output[ampA.output.length - 1]) : ampB.calcOutput(ampA.output[ampA.output.length - 1]);
            (count === 0) ? ampC.calcOutput(c, ampB.output[ampB.output.length - 1]) : ampC.calcOutput(ampB.output[ampB.output.length - 1]);
            (count === 0) ? ampD.calcOutput(d, ampC.output[ampC.output.length - 1]) : ampD.calcOutput(ampC.output[ampC.output.length - 1]);
            (count === 0) ? ampE.calcOutput(e, ampD.output[ampD.output.length - 1]) : ampE.calcOutput(ampD.output[ampD.output.length - 1]);
            count++
          }

          // if amps are finished with the program, push the output of the final amp into the signal list
          signalList.push(ampE.output[ampE.output.length - 1]);
          }
        }
      }
    }
  }

  // return highest signal value
  return Math.max(...signalList);
}


console.log(calcHighestSignal(testInput4));
console.log(calcHighestSignal(input));