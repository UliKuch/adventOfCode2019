const input = [3,225,1,225,6,6,1100,1,238,225,104,0,2,136,183,224,101,-5304,224,224,4,224,1002,223,8,223,1001,224,6,224,1,224,223,223,1101,72,47,225,1101,59,55,225,1101,46,75,225,1101,49,15,224,101,-64,224,224,4,224,1002,223,8,223,1001,224,5,224,1,224,223,223,102,9,210,224,1001,224,-270,224,4,224,1002,223,8,223,1001,224,2,224,1,223,224,223,101,14,35,224,101,-86,224,224,4,224,1002,223,8,223,101,4,224,224,1,224,223,223,1102,40,74,224,1001,224,-2960,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1101,10,78,225,1001,39,90,224,1001,224,-149,224,4,224,102,8,223,223,1001,224,4,224,1,223,224,223,1002,217,50,224,1001,224,-1650,224,4,224,1002,223,8,223,1001,224,7,224,1,224,223,223,1102,68,8,225,1,43,214,224,1001,224,-126,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1102,88,30,225,1102,18,80,225,1102,33,28,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,677,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1107,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,108,226,226,224,102,2,223,223,1005,224,359,1001,223,1,223,1108,677,226,224,102,2,223,223,1006,224,374,101,1,223,223,108,677,226,224,102,2,223,223,1006,224,389,1001,223,1,223,107,226,226,224,102,2,223,223,1005,224,404,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,419,101,1,223,223,1107,677,677,224,102,2,223,223,1006,224,434,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,449,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,464,1001,223,1,223,1108,226,677,224,1002,223,2,223,1005,224,479,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,494,101,1,223,223,7,226,677,224,102,2,223,223,1005,224,509,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,524,101,1,223,223,8,226,677,224,1002,223,2,223,1006,224,539,1001,223,1,223,1007,677,677,224,102,2,223,223,1005,224,554,101,1,223,223,107,226,677,224,1002,223,2,223,1005,224,569,1001,223,1,223,1108,677,677,224,1002,223,2,223,1006,224,584,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,599,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,614,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,107,677,677,224,1002,223,2,223,1006,224,644,101,1,223,223,1007,226,677,224,1002,223,2,223,1005,224,659,1001,223,1,223,1007,226,226,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226]

class Intcode {
  constructor(program) {
    this._program = [...program];
    this.output = [];
    this._finished = false;
    this.position = 0;
  };

  set program(newProgram) {
    this._program = [...newProgram];
    this._finished = false;
    this.position = 0;
  };

  get program() {
    return this._program;
  };

  get finished() {
    return this._finished;
  }

  resetOutput() {
    this.output = [];
  }

  calcOutput(...input) {
    let arr = this._program;

    let step = 4,
        opcode = 0,
        inputProcessed = 0,
        modeParam1 = 0,
        modeParam2 = 0,
        modeParam3 = 0,
        valueParam1 = 0,
        valueParam2 = 0,
        valueParam3 = 0;

    for (this.position; this.position < arr.length; this.position += step) {
      let i = this.position;

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
        case 1:
          arr[arr[i + 3]] = valueParam1 + valueParam2;
          step = 4;
          break;
        case 2:
          arr[arr[i + 3]] = valueParam1 * valueParam2;
          step = 4;
          break;
        case 3:
          if (inputProcessed === input.length) {
            return this.output;
          }
          arr[arr[i + 1]] = input[inputProcessed];
          inputProcessed ++;
          step = 2;
          break;
        case 4:
          this.output.push(valueParam1);
          step = 2;
          break;
        case 5:
          this.position = !(valueParam1 === 0) ? valueParam2 : i;
          step = !(valueParam1 === 0) ? 0 : 3;
          break;
        case 6:
          this.position = (valueParam1 === 0) ? valueParam2 : i;
          step = (valueParam1 === 0) ? 0 : 3;
          break;
        case 7:
          arr[arr[i + 3]] = (valueParam1 < valueParam2) ? 1 : 0;
          step = 4;
          break;
        case 8:
            arr[arr[i + 3]] = (valueParam1 === valueParam2) ? 1 : 0;
            step = 4;
          break;
        case 99:
          this._finished = true;
          return this.output;
        default:
          return "Error!";
      }
    }
  };
}

// only show result for day 5 if module is called directly
// (see https://stackoverflow.com/questions/4981891/node-js-equivalent-of-pythons-if-name-main)
if (typeof require !== 'undefined' && require.main === module) {
  const computer = new Intcode(input)

  console.log("Result part 1: ", computer.calcOutput(1));
  computer.program = input;
  computer.resetOutput();
  console.log("Result part 2: ", computer.calcOutput(5));
}

module.exports = {Intcode}