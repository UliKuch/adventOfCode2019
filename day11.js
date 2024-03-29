const input = [3,8,1005,8,314,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,28,2,2,16,10,1,1108,7,10,1006,0,10,1,5,14,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,65,1006,0,59,2,109,1,10,1006,0,51,2,1003,12,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,101,1006,0,34,1,1106,0,10,1,1101,17,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,135,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,156,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,178,1,108,19,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1002,8,1,204,1,1006,17,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,230,1006,0,67,1,103,11,10,1,1009,19,10,1,109,10,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,268,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,290,2,108,13,10,101,1,9,9,1007,9,989,10,1005,10,15,99,109,636,104,0,104,1,21101,48210224024,0,1,21101,0,331,0,1105,1,435,21101,0,937264165644,1,21101,0,342,0,1105,1,435,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,235354025051,0,1,21101,389,0,0,1105,1,435,21102,29166169280,1,1,21102,400,1,0,1105,1,435,3,10,104,0,104,0,3,10,104,0,104,0,21102,709475849060,1,1,21102,1,423,0,1106,0,435,21102,868498428684,1,1,21101,434,0,0,1105,1,435,99,109,2,21201,-1,0,1,21101,0,40,2,21102,1,466,3,21101,456,0,0,1105,1,499,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,461,462,477,4,0,1001,461,1,461,108,4,461,10,1006,10,493,1101,0,0,461,109,-2,2106,0,0,0,109,4,2102,1,-1,498,1207,-3,0,10,1006,10,516,21102,1,0,-3,21201,-3,0,1,21201,-2,0,2,21102,1,1,3,21102,535,1,0,1106,0,540,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,563,2207,-4,-2,10,1006,10,563,21202,-4,1,-4,1106,0,631,21201,-4,0,1,21201,-3,-1,2,21202,-2,2,3,21101,582,0,0,1105,1,540,22102,1,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,601,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,623,22102,1,-1,1,21101,623,0,0,105,1,498,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0];

const { Intcode } = require("./intcode");

const fs = require('fs');


class HullPaintingRobot {
  constructor(program) {
    this.position = {x: 0, y: 0};
    // {x: 0, y: 0}
    this.panelsPainted = [];
    this.panelsPaintedColor = [];
    // direction 0 is north, continuing clockwise (here, an enum would be useful)
    this.direction = 0;
    // 0 = black; 1 = white
    this.currentPanel = 1;
    this.computer = new Intcode(program);
  }

  paintPanel() {
    let instruction = this.computer.calcOutput(this.currentPanel);
    let color = instruction[instruction.length - 2];
    let direction = instruction[instruction.length - 1];

    // save panel position (if new) and save/update color in arrays
    if (this.panelsPainted.some(p => p.x === this.position.x && p.y === this.position.y)) {
      this.panelsPaintedColor[this.panelsPainted.findIndex(p => p.x === this.position.x && p.y === this.position.y)] = color;
    } else {
      this.panelsPainted.push({...this.position});
      this.panelsPaintedColor.push(color);
    }

    // set direction
    (direction > 0) ? this.direction++ : this.direction--;
    (this.direction < 0) ? this.direction = 3 : null;
    (this.direction > 3) ? this.direction = 0 : null;

    // move
    switch (this.direction) {
      case 0:
        this.position.y--;
        break;
      case 1:
        this.position.x++;
        break;
      case 2:
        this.position.y++;
        break;
      case 3:
        this.position.x--;
        break;
      default:
        console.log("Error while trying to move.")
        return;
    }

    // set color of current panel
    this.currentPanel = (this.panelsPainted.some(p => p.x === this.position.x && p.y === this.position.y))
        ? this.panelsPaintedColor[this.panelsPainted.findIndex(p => p.x === this.position.x && p.y === this.position.y)]
        : 0;
  }

}

const robot = new HullPaintingRobot(input);

function paint(robot) {
  for (let x = 0; x < 1000; x++) {
    robot.paintPanel();
    console.log("panelsPainted.length", robot.panelsPainted.length);
  }
};


function displayPainting(panelsPainted, panelsPaintedColor) {
  let painting = [];
  let paintingLine = new Array(50).fill(".");

  // fill painting with lines
  for (let i = 0; i < 10; i++) {
    painting.push([...paintingLine]);
  }

  // paint black panels
  panelsPainted.forEach((point, index) => {
    if (panelsPaintedColor[index] === 1) {
      painting[point.y][point.x] = "#";
    }
  });

  // append each line of painting to file
  painting.forEach(line => {
    fs.appendFileSync("day11_output.txt", line.join("") + "\n" , function(err) {
      if(err) {
          return console.log(err);
      }
    }); 
  })
}


paint(robot);
displayPainting(robot.panelsPainted, robot.panelsPaintedColor);