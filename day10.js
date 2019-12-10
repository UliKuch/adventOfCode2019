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

  // iterate over each line in map
  for (let y = 0; y < map.length; y++) {
    // iterate over each item in line
    for (let x = 0; x < map[0].length; x++) {
      (map[y][x] === "#") && asteroidsVisible.push(calcAsteroidsVisible(map, [x, y]));
    }
  }

  return Math.max(...asteroidsVisible);
}

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
}


console.log(findBestLocation(testInput));
console.log(findBestLocation(testInput2));
console.log(findBestLocation(testInput3));
console.log(findBestLocation(testInput4));
console.log(findBestLocation(input));