const input = require("./day06_input");
const testInput = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`

const testInput2 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`


function calcAllOrbits(input) {
  let c = 0; // counter

  // split input string into array of tuples
  const splitArr = input.split("\n")
  .map(str => {
    let splitString = str.split(")");
    return splitString;
  });

  // calculate number of orbits for each "object" (second value of tuple)
  // by increading c by 1 + the number of orbits of the orbited "object" (tuple[0])
  splitArr.forEach((tuple) => {
    c += 1 + calcOrbitsOfObject(tuple[0], splitArr);
  })

  return c;
}


// calculate all orbits of a given "object"
function calcOrbitsOfObject(spaceObject, array) {
  let c = 0; // counter
  let match = ""
  
  // check if input "object" (spaceObject) orbits another "object" (i.e. is at the array[i][1] position)
  for (let i = 0; i < array.length; i++) {
    if (array[i][1] === spaceObject) {
      c++;
      match = array[i][0];
      break;
    }
  }
  
  // if spaceObject orbits another "object", add the orbit of that "object" to the return value
  return (c > 0) ? c + calcOrbitsOfObject(match, array) : 0;
};


function calcDistanceToSanta(input) {

  // split input string into array of tuples
  const splitArr = input.split("\n")
  .map(str => {
    let splitString = str.split(")");
    return splitString;
  });

  let you;
  let santa;

  // find you and santa
  for (let i = 0; i < splitArr.length; i++) {
    (splitArr[i][1] === "YOU") ? you = splitArr[i] : null;
    (splitArr[i][1] === "SAN") ? santa = splitArr[i] : null;

    if ((santa != undefined) && (you != undefined)) {
      break;
    }
  }

  // calculate your path
  const yourPath = calcPath(you[0], splitArr);
  const santasPath = calcPath(santa[0], splitArr);

  let commonNode;
  let yourDistanceToCommonNode;
  let santasDistanceToCommonNode;

  // find common node and calculate distance to it
  for (let i = 0; i < yourPath.length; i++) {
    commonNode = santasPath.find(node => node === yourPath[i]);

    if (commonNode != undefined) {
      yourDistanceToCommonNode = i + 1;
      santasDistanceToCommonNode = santasPath.indexOf(commonNode) + 1;
      break;
    }
  }

  return yourDistanceToCommonNode + santasDistanceToCommonNode
}


// calculate whole path of an input "object" (spaceObject)
function calcPath(spaceObject, array) {
  let match;
  let path = [];
  
  // check if input "object" (spaceObject) orbits another "object" (i.e. is at the array[i][1] position)
  // and add that "object" to path
  for (let i = 0; i < array.length; i++) {
    if (array[i][1] === spaceObject) {
      match = array[i][0];
      path.push(match)
      break;
    }
  }
  
  // if spaceObject orbits another "object", add the path of that "object" to the return array (path)
  return (match != undefined) ? path.concat(calcPath(match, array)) : path;
};


console.log(calcAllOrbits(testInput));
console.log(calcAllOrbits(input));
console.log(calcDistanceToSanta(testInput2))
console.log(calcDistanceToSanta(input));