const input = [3,8,1001,8,10,8,105,1,0,0,21,34,43,64,85,98,179,260,341,422,99999,3,9,1001,9,3,9,102,3,9,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,1001,9,2,9,1002,9,4,9,1001,9,3,9,1002,9,4,9,4,9,99,3,9,1001,9,3,9,102,3,9,9,101,4,9,9,102,3,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99];
const testInput1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
const testInput2 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
const testInput3 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];

function intcode(program, ...input) {
  let arr = [...program];

  let outputArray = [],
      step = 4,
      opcode = 0,
      modeParam1 = 0,
      modeParam2 = 0,
      modeParam3 = 0,
      valueParam1 = 0,
      valueParam2 = 0,
      valueParam3 = 0,
      chooseInput = 0;

  for (let i = 0; i < arr.length; i += step) {

    // if opcode value (arr[i]) is bigger than 99 (i.e. if there is a parameter in immediate mode),
    // set opcode variable to last two digits of arr[i]
    opcode = arr[i] > 99 ? parseInt(arr[i].toString().substring((arr[i].toString().length - 2))) : arr[i];

    // set modes of parameters if specified
    modeParam1 = (arr[i].toString().length > 2) ? parseInt(arr[i].toString()[arr[i].toString().length - 3]) : 0;
    modeParam2 = (arr[i].toString().length > 3) ? parseInt(arr[i].toString()[arr[i].toString().length - 4]) : 0;
    modeParam3 = (arr[i].toString().length > 4) ? parseInt(arr[i].toString()[arr[i].toString().length - 5]) : 0;

    // set parameters' values according to modes
    valueParam1 = (modeParam1 === 0) ? arr[arr[i + 1]] : arr[i + 1];
    valueParam2 = (modeParam2 === 0) ? arr[arr[i + 2]] : arr[i + 2];
    valueParam3 = (modeParam3 === 0) ? arr[arr[i + 3]] : arr[i + 3];

    switch (opcode) {
      case 01:
        arr[arr[i + 3]] = valueParam1 + valueParam2;
        step = 4;
        break;
      case 02:
        arr[arr[i + 3]] = valueParam1 * valueParam2;
        step = 4;
        break;
      case 03:
        arr[arr[i + 1]] = input[chooseInput];
        chooseInput ++;
        step = 2;
        break;
      case 04:
        outputArray.push(valueParam1);
        step = 2;
        break;
      case 05:
        i = !(valueParam1 === 0) ? valueParam2 : i;
        step = !(valueParam1 === 0) ? 0 : 3;
        break;
      case 06:
        i = (valueParam1 === 0) ? valueParam2 : i;
        step = (valueParam1 === 0) ? 0 : 3;
        break;
      case 07:
        arr[arr[i + 3]] = (valueParam1 < valueParam2) ? 1 : 0;
        step = 4;
        break;
      case 08:
          arr[arr[i + 3]] = (valueParam1 === valueParam2) ? 1 : 0;
          step = 4;
        break;
      case 99:
        return outputArray;
      default:
        return "Error!";
    }
  }
}


function calcHighestSignal(input) {
  let signalList = [];

  // check all possible amp-phase combinations (avoiding same phase for different amps)
  // and push resulting signals into signal list
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      if (a === b) {
        continue
      }
      for (let c = 0; c < 5; c++) {
        if (a === c || b === c) {
          continue
        }
        for (let d = 0; d < 5; d++) {
          if (a === d || b === d || c === d) {
            continue
          }
          for (let e = 0; e < 5; e++) {
          if (a === e || b === e || c === e || d === e) {
            continue
          }
          signalList.push(intcode(input, e, intcode(input, d, intcode(input, c, intcode(input, b, intcode(input, a, 0)[0])[0])[0])[0])[0]);
          }
        }
      }
    }
  }

  // return highest signal value
  return Math.max(...signalList);
}


console.log(calcHighestSignal(testInput1));
console.log(calcHighestSignal(testInput2));
console.log(calcHighestSignal(testInput3));
console.log(calcHighestSignal(input));

