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
  const arr = input.split("\n");
  let c = 0; // counter

  const splitArr = arr.map(str => {
    let splitString = str.split(")");
    return splitString;
  });


  splitArr.forEach((tuple) => {
    c += calcOrbitsOfObject(tuple[1], splitArr);
  })

  return c;
}

function calcOrbitsOfObject(str, array) {
  let c = 0; // counter
  let match = ""
  
  array.forEach(tuple => {
    if (tuple[1] === str) {
      c++;
      match = tuple[0]
    }
  })
  
  return (c > 0) ? c + calcOrbitsOfObject(match, array) : 0;

};

console.log(calcAllOrbits(testInput));
console.log(calcAllOrbits(input));