const input = require("./day10_input");
const testInput = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

const testInput2 = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;

const testInput3 = `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`

const testInput4 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`


function findBestLocation(input) {
  const map = input.split("\n");

  let asteroidsVisible = [];
  let coordinates = []

  // iterate over each line in map
  for (let y = 0; y < map.length; y++) {
    // iterate over each item in line
    for (let x = 0; x < map[0].length; x++) {
      (map[y][x] === "#") && asteroidsVisible.push(calcAsteroidsVisible(map, [x, y])) && coordinates.push([x, y]);
    }
  }

  const maxAsteroidsNumber = Math.max(...asteroidsVisible);
  const maxAsteroidsCoordinates = coordinates[asteroidsVisible.findIndex(num => num === maxAsteroidsNumber)];
  
  return [maxAsteroidsNumber, maxAsteroidsCoordinates];
};


function calcAsteroidsVisible(map, point) {
  // store coordinates in variables
  const x1 = point[0];
  const y1 = point[1];

  // two slopes arrays to avoid problems with identical slope values pointing in different directions
  let slopes1 = [];
  let slopes2 = [];
  
  // iterate over each line in map to find distances to point
  for (let y2 = 0; y2 < map.length; y2++) {
    // iterate over each item in line
    for (let x2 = 0; x2 < map[0].length; x2++) {

      // if there is no asteroid at current point or the current asteroid, continue to next iteration
      if (map[y2][x2] != "#" || (x1 === x2 && y1 === y2)) {
        continue;
      }
      
      let slope = (y2 - y1) / (x2 - x1);

      // push slope to right slopes array
      (y2 < y1 || (y1 === y2 && x2 < x1)) ? slopes1.push(slope) : slopes2.push(slope);
    }
  }

  // return length of slopes w/o duplicates
  return [...new Set(slopes1)].length + [...new Set(slopes2)].length;
};


function winBet(input, point) {
  const map = input.split("\n");

  // hit counter
  let c = 0;

  // store coordinates in variables
  const x1 = point[0];
  const y1 = point[1];

  // one slope for each quadrant, starting top right and going clockwise
  let slopes1 = [];
      slopes2 = [],
      slopes3 = [],
      slopes4 = [];
  
  
  // iterate over each line in map to find distances to point
  for (let y2 = 0; y2 < map.length; y2++) {
    // iterate over each item in line
    for (let x2 = 0; x2 < map[0].length; x2++) {

      // if there is no asteroid at current point or the current asteroid, continue to next iteration
      if (map[y2][x2] != "#" || (x1 === x2 && y1 === y2)) {
        continue;
      }
      
      let slope = (y2 - y1) / (x2 - x1);

      // push slope and coordinates to right slopes array
      // first quadrant
      (slope < 0) && (y2 < y1 || (y1 === y2 && x2 < x1)) && slopes1.push([slope, x2, y2]);       
      // second quadrant
      (slope >= 0) && (!(y2 < y1 || (y1 === y2 && x2 < x1))) && slopes2.push([slope, x2, y2]); 
      // third quadrant
      (slope < 0) && (!(y2 < y1 || (y1 === y2 && x2 < x1))) && slopes3.push([slope, x2, y2]); 
      // fourth quadrant
      (slope >= 0) && (y2 < y1 || (y1 === y2 && x2 < x1)) && slopes4.push([slope, x2, y2]); 
    }
  }


  // sort slopes
  let slopes1Sorted = slopes1.sort(function(a, b){return a[0] - b[0]});
  let slopes2Sorted = slopes2.sort(function(a, b){return a[0] - b[0]});
  let slopes3Sorted = slopes3.sort(function(a, b){return a[0] - b[0]});
  let slopes4Sorted = slopes4.sort(function(a, b){return a[0] - b[0]});

  const totalAsteroids = slopes1.length + slopes2.length + slopes3.length + slopes4.length;

  // shoot asteroids...
  while (c < totalAsteroids) {

    let slopes = [slopes1Sorted, slopes2Sorted, slopes3Sorted, slopes4Sorted]

    // ... by quadrant
    for (let i = 0; i < 4; i++) {
      let shots = shootAsteroids(slopes[i], c);
      slopes[i] = shots[0];
      c = shots[1];
      if (shots[2]) {
        return shots[2][1] * 100 + shots[2][2];
      }
    }
  }
}

function shootAsteroids(slopes, counter) {
  let c = counter + 1;
  let skipped = 0;
  let output = [...slopes];
  let result;

  for (let a = 1; a < slopes.length; a++) {
    if (slopes[a][0] === slopes[a-1][0]) {
      skipped++;
      continue;
    }

    output.splice(skipped, 1);
    c++;
    if (c === 200) {
      result = slopes[a];;
    }
  }

  return [output, c, result]
}



console.log(findBestLocation(testInput));
console.log(findBestLocation(testInput2));
console.log(findBestLocation(testInput3));
console.log(findBestLocation(testInput4));
console.log(findBestLocation(input));

console.log(winBet(testInput4, [11, 13]));
console.log(winBet(input, [23, 19]));