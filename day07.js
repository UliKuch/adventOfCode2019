const input = [3,8,1001,8,10,8,105,1,0,0,21,34,43,64,85,98,179,260,341,422,99999,3,9,1001,9,3,9,102,3,9,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,1001,9,2,9,1002,9,4,9,1001,9,3,9,1002,9,4,9,4,9,99,3,9,1001,9,3,9,102,3,9,9,101,4,9,9,102,3,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99];
const testInput1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
const testInput2 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
const testInput3 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
const testInput4 = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

function intcode(program, startingIndex = 0, ...input) {
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

  for (let i = startingIndex; i < arr.length; i += step) {

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
        // if there is more input required than given, return an object containing all the relevant information
        // to continue once the required input is calculated
        if (chooseInput > input.length - 1) {
          return {
            outputArray: outputArray,
            arr: arr,
            startingIndex: i,
            finished : false,
          };
        }  
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
        return {
          outputArray: outputArray,
          finished: true,
        };
      default:
        return "Error!";
    }
  }
}


function calcHighestSignal(input) {
  let signalList = [];

  // initialise data object variables
  let aData,
      bData,
      cData,
      dData,
      eData;

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

          // set data oobject variables to identical data objects and reset them on each iteration
          aData = {
            arr: input,
            startingIndex: 0,
            finished: false,
            outputArray: [],
          };
          bData = {...aData};
          cData = {...aData};
          dData = {...aData};
          eData = {...aData};
          
          // as long as the intcode program is not finished...
          while (aData.finished === false) {
            // ... reset data objects variable with data objects calculated by intcode: on first iteration with amp phase and first input signal,
            // on second only with input signal
            aData = (count === 0) ? intcode(aData.arr, aData.startingIndex, a, 0) : intcode(aData.arr, aData.startingIndex, eData.outputArray[0]);
            bData = (count === 0) ? intcode(bData.arr, bData.startingIndex, b, aData.outputArray[0]) : intcode(bData.arr, bData.startingIndex, aData.outputArray[0]);
            cData = (count === 0) ? intcode(cData.arr, cData.startingIndex, c, bData.outputArray[0]) : intcode(cData.arr, cData.startingIndex, bData.outputArray[0]);
            dData = (count === 0) ? intcode(dData.arr, dData.startingIndex, d, cData.outputArray[0]) : intcode(dData.arr, dData.startingIndex, cData.outputArray[0]);
            eData = (count === 0) ? intcode(eData.arr, eData.startingIndex, e, dData.outputArray[0]) : intcode(eData.arr, eData.startingIndex, dData.outputArray[0]);
            count++
          }

          // if intcode programs are finished, push the output of the final amp into the signal list
          signalList.push(eData.outputArray[0]);
          }
        }
      }
    }
  }

  // return highest signal value
  return Math.max(...signalList);
}


// console.log(calcHighestSignal(testInput1));
// console.log(calcHighestSignal(testInput2));
// console.log(calcHighestSignal(testInput3));
// console.log(calcHighestSignal(input));

console.log(calcHighestSignal(testInput4));
console.log(calcHighestSignal(input));