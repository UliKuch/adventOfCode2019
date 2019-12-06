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

function calcOrbitsOfObject(str, array) {
  let c = 0; // counter
  let match = ""
  
  // check if input "object" (str) orbits another object (i.e. is at the array[i][1] position)
  for (let i = 0; i < array.length; i++) {
    if (array[i][1] === str) {
      c++;
      match = array[i][0];
      break;
    }
  }
  
  // if str orbits another "object", add the orbit of that "object" to the return value
  return (c > 0) ? c + calcOrbitsOfObject(match, array) : 0;
};

console.log(calcAllOrbits(testInput));
console.log(calcAllOrbits(input));