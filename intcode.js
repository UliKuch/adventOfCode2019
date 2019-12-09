class Intcode {
  constructor(program) {
    this._program = [...program];
    this.memory = program.concat(new Array(10000).fill(0));
    this.output = [];
    this._finished = false;
    this.position = 0; // the current position in processing the program
    this.relativeBase = 0 // relative base for parameters in relative mode
  };

  set program(newProgram) {
    this._program = [...newProgram];
    this.memory = newProgram.concat(new Array(10000).fill(0));
    this._finished = false;
    this.position = 0;
    this.relativeBase = 0;
    // output has to be reset manually using resetOutput()
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

  setValueOfParam(param, paramMode) {
    switch (paramMode) {
      // position mode
      case 0: 
        return this.memory[param];
      // immediate mode
      case 1:
        return param;
      // relative mode
      case 2:
        return this.memory[param + this.relativeBase]
      default:
        return "Error while setting parameter value.";
    }
  }

  calcOutput(...input) {
    
    // use this.memory instead of this._program to account for instructions accessing values
    // outside of program's length
    let arr = this.memory;
    let program = this._program;

    let step = 4,
        inputProcessed = 0;

    // iterate over program, starting at intocde's current position (this.position)
    for (this.position; this.position < program.length; this.position += step) {
      // set i to current position
      let i = this.position;

      // the value at the current position of the program serves as the instruction
      // (consisting of mode of paramters (if specified) and opcode)
      let instruction = arr[i];
      let instrAsStr = instruction.toString();

      // if instruction is bigger than 99 (i.e. if a mode for the parameters is specified),
      // set opcode variable to last two digits of instruction
      let opcode = instruction > 99 ? parseInt(instrAsStr.substring((instrAsStr.length - 2))) : instruction;

      // store parameters in variables
      let param1 = arr[i + 1],
          param2 = arr[i + 2],
          param3 = arr[i + 3]

      // set modes of parameters if specified
      let modeParam1 = (instrAsStr.length > 2) ? parseInt(instrAsStr[instrAsStr.length - 3]) : 0,
          modeParam2 = (instrAsStr.length > 3) ? parseInt(instrAsStr[instrAsStr.length - 4]) : 0,
          modeParam3 = (instrAsStr.length > 4) ? parseInt(instrAsStr[instrAsStr.length - 5]) : 0;

      // set parameters' values according to modes
      let valueParam1 = this.setValueOfParam(param1, modeParam1),
          valueParam2 = this.setValueOfParam(param2, modeParam2),
          valueParam3 = this.setValueOfParam(param3, modeParam3);

      // set positions indicated by parameters
      let positionFromParam1 = (modeParam1 === 2) ? (param1 + this.relativeBase) : param1,
          positionFromParam2 = (modeParam2 === 2) ? (param2 + this.relativeBase) : param2,
          positionFromParam3 = (modeParam3 === 2) ? (param3 + this.relativeBase) : param3;

      switch (opcode) {
        case 1:
          arr[positionFromParam3] = valueParam1 + valueParam2;
          step = 4;
          break;
        case 2:
          arr[positionFromParam3] = valueParam1 * valueParam2;
          step = 4;
          break;
        case 3:
          if (inputProcessed === input.length) {
            return this.output;
          }
          arr[positionFromParam1] = input[inputProcessed];
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
          arr[positionFromParam3] = (valueParam1 < valueParam2) ? 1 : 0;
          step = 4;
          break;
        case 8:
          arr[positionFromParam3] = (valueParam1 === valueParam2) ? 1 : 0;
          step = 4;
          break;
        case 9:
          this.relativeBase += valueParam1;
          step = 2;
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

module.exports = {Intcode};