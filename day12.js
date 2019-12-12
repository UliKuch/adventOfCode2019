const input = [{x: 3, y: -6, z: 6}, {x: 10, y: 7, z: -9}, {x: -3, y: -7, z: 9}, {x: -8, y: 0, z: 4}];
const testInput1 = [{x: -1, y: 0, z: 2}, {x: 2, y: -10, z: -7}, {x: 4, y: -8, z: 8}, {x: 3, y: 5, z: -1}];

class Moon {
  constructor(coordinates) {
    this.position = {...coordinates};
    this.velocity = {x: 0, y: 0, z: 0};
    this.history = [];
  };

  get pot() {
    return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
  };

  get kin() {
    return Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
  };

  get totalEnergy() {
    return this.pot * this.kin;
  }

  get stepsPerformed() {
    return this.history.length; 
  }

  newTimeStep(...moons) {
    // change velocity by applying gravity
    moons.forEach(moon => {

      // if other moon has more time steps performed, use the appropriate position from its history
      let moonPosition = (moon.stepsPerformed > this.stepsPerformed) ? moon.history[this.stepsPerformed] : moon.position;

      for (const axis in moonPosition) {
        if (this.position[axis] != moonPosition[axis]) {
          this.velocity[axis] += (this.position[axis] > moonPosition[axis]) ? -1 : 1;
        }
      }
    })

    // save current position in history
    this.history.push({...this.position});

    // change position by applying velocity
    for (const axis in this.position) {
      this.position[axis] += this.velocity[axis]
    }
  };
};


function moveMoons(...moons) {
  moons.forEach((moon, index) => {
    // copy moons
    let otherMoons = [...moons];
    
    // removes current moon from otherMoons array
    otherMoons.splice(index, 1);

    moon.newTimeStep(...otherMoons);
  });

  return;
}


function calcTotalEnergy(steps, ...moons) {
  for (let x = 0; x < steps; x++) {
    moveMoons(...moons);
  }

  return moons.reduce((a, b) => a + b.totalEnergy, 0);
}


const io = new Moon(input[0]),
      europa = new Moon(input[1]),
      ganymede = new Moon(input[2]),
      callisto = new Moon(input[3]);

// const io = new Moon(testInput1[0]),
//       europa = new Moon(testInput1[1]),
//       ganymede = new Moon(testInput1[2]),
//       callisto = new Moon(testInput1[3]);

const moonArray = [io, europa, ganymede, callisto];

console.log(calcTotalEnergy(1000, ...moonArray));
