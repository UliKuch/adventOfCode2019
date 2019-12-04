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

      // check for length of adjacent matches
      lengthAdjacentMatches = numbersGroupLength(c, index, pwLength)

      // if there are more than 2 adjacent matches and there haven't been any doubles before...
      if ((lengthAdjacentMatches > 2) && (doubles === 0)) {

        // ... subtract number of doubles the group of matches will count for from doubles counter
        // (if the group is three digits long, it will count for two doubles. by subtracting them
        // from the doubles counter, c will only be added if there is another double)
        doubles -= lengthAdjacentMatches - 1;
      }

      // check for adjacent doubles
      if (parseInt(pwString[index + 1]) === parseInt(pwString[index])) {
        doubles++;
      }

      // add c to array of possible pws if the doubles counter is larger than 0 in the final iteration
      (index === pwLength - 2) && (doubles > 0) ? possPasswords.push(c) : null;
    }
  }

  return possPasswords.length;
};


// returns size of group of adjacent digits
function numbersGroupLength(number, index, pwLength) {

  let counter = 0;

  if (index > pwLength - 1) {
    return 0;
  }

  // if digit is the same as the next digit, increase counter by one
  parseInt(number.toString()[index]) === parseInt(number.toString()[index + 1]) ? counter++ : null;

  return (counter === 0) ? 1 : counter + numbersGroupLength(number, index + 1, pwLength);
};


console.log(calcPossibilities(rangeStart, rangeEnd));