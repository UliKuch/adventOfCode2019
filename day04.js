const rangeStart = 134792;
const rangeEnd = 675810;

function calcPossibilities(rangeStart, rangeEnd) {
  const pwLength = 6;

  let possPasswords = [];
  let doubles = 0;
  let pwString = "";

  for (let c = rangeStart; c <= rangeEnd; c++) {
    doubles = 0;
    pwString = c.toString();

    for (let d = 0; d < pwLength - 1; d++) {
      
      // check for decreasing numbers
      if (parseInt(pwString[d + 1]) < parseInt(pwString[d])) {
        break;
      };

      // check for adjacent doubles
      if (parseInt(pwString[d + 1]) === parseInt(pwString[d])) {
        doubles++;
      }

      (d === pwLength - 2) && (doubles > 0) ? possPasswords.push(c) : null;
    }
  }

  return possPasswords.length;
};

console.log(calcPossibilities(rangeStart, rangeEnd));