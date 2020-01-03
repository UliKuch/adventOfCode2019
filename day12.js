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


function stepsToPrevState(steps, ...moons) {
  let sameX = [];
  let sameY = [];
  let sameZ = [];

  for (let i = 1; i < steps; i++) {
    moveMoons(...moons);

    // if x position is identical to starting position and x velocity identical to starting velocity (0), add to sameX array...
    if (moons.every(moon => moon.position.x === moon.history[0].x && moon.velocity.x === 0)) {
      sameX.push(i)
    }

    // ... do the same for y...
    if (moons.every(moon => moon.position.y === moon.history[0].y && moon.velocity.y === 0)) {
      sameY.push(i)
    }

    // ... and for z.
    if (moons.every(moon => moon.position.z === moon.history[0].z && moon.velocity.z === 0)) {
      sameZ.push(i)
    }
  }

  // calculate lowest common multitude
  let lcmVelocities = [sameX[0], sameY[0], sameZ[0]].reduce(lcm);

  console.log("sameX: ", sameX)
  console.log("sameX period: ", sameX.map((pos, index) => sameX[index + 1] - pos));

  console.log("sameY: ", sameY)
  console.log("sameY period: ", sameY.map((pos, index) => sameY[index + 1] - pos));

  console.log("sameZ: ", sameZ)
  console.log("sameZ period: ", sameZ.map((pos, index) => sameZ[index + 1] - pos));

  console.log("lcmVelocities:", lcmVelocities)

  return lcmVelocities;
}

// find lowest common multitude (from https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm)
// use like this to calculate lcm of an array: [1, 2, 3, 4, 5].reduce(lcm);
const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

const io = new Moon(input[0]),
      europa = new Moon(input[1]),
      ganymede = new Moon(input[2]),
      callisto = new Moon(input[3]);

// const io = new Moon(testInput1[0]),
//       europa = new Moon(testInput1[1]),
//       ganymede = new Moon(testInput1[2]),
//       callisto = new Moon(testInput1[3]);

const moonArray = [io, europa, ganymede, callisto];

// console.log(calcTotalEnergy(1000, ...moonArray));

console.log(stepsToPrevState(1000000, ...moonArray));