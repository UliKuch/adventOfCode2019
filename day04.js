const rangeStart = 134792;
const rangeEnd = 675810;

function calcPossibilities(rangeStart, rangeEnd) {
  const pwLength = 6;

  let possPasswords = [];
  let doubles = 0;
  let lengthAdjacentMatches = 0;
  let pwString = "";

  // iterate through numbers from starting value to end value
  for (let c = rangeStart; c <= rangeEnd; c++) {
    doubles = 0;
    lengthAdjacentMatches = 0;
    pwString = c.toString();

    // iterate through digits of each number
    for (let index = 0; index < pwLength - 1; index++) {
      
      // check for decreasing numbers
      if (parseInt(pwString[index + 1]) < parseInt(pwString[index])) {
        break;
      };

      // check for proper doubles (two and only two identical digits)
      if ((parseInt(pwString[index + 1]) === parseInt(pwString[index])) && !(parseInt(pwString[index + 2]) === parseInt(pwString[index]))
          && !(parseInt(pwString[index + 1]) === parseInt(pwString[index - 1]))) {
        doubles++;
      }

      // add c to array of possible pws if the doubles counter is larger than 0 in the final iteration
      (index === pwLength - 2) && (doubles > 0) ? possPasswords.push(c) : null;
    }
  }

  return possPasswords.length;
};


console.log(calcPossibilities(rangeStart, rangeEnd));