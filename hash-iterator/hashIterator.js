const crypto = require("crypto");



function calculateHash(salt, nounce) {
  const msg = `${salt}${nounce}`
  const md5Hash = crypto.createHash('md5').update(msg).digest("hex");
  return md5Hash.toString()
}

function generateHash(salt,difficulty) {
  let nounce = 1; // initial nounce
  let hash = calculateHash(salt, nounce); // initial hash
  let notFound = true // run while until false
  let foundCounter = 0; // initial counter for our 10 findings
  let result = new Array(9);
  let positionIsUsed = []

  while (notFound) {
    if ((hash.substring(0, difficulty) !== Array(difficulty + 1).join('0'))) { // check if it starts with X zeros
       nounce++;
       hash = calculateHash(salt, nounce);
    } else if (isNaN(Number(hash.substring(difficulty, difficulty + 1)))) { // check if the element after the last zero is a number
      nounce++;
      hash = calculateHash(salt, nounce);
    } else if (foundCounter < 10) {
      const hashPosition = nounce % 32;
      const element = hash.substring(hashPosition, hashPosition + 1);
      const elementAfterZeros = Number(hash.substring(difficulty, difficulty + 1));

      if (!positionIsUsed.includes(elementAfterZeros)) { // the position it's already used ?
        positionIsUsed.push(elementAfterZeros)
        result[elementAfterZeros] = element;
        foundCounter++;
      }

      nounce++;
      hash = calculateHash(salt, nounce);
    } else {
      notFound = false; // game over
    }
  }

  return result.join(''); // return in one string
}

// // TODO: get / validate ARGs
function validateArgs(args) {
  if (args.length <= 3 || args.length > 4) {
    console.log('invalid args ... try something like: node hashIterator machine-learning 4');
    process.exit(1);
  }
}

function main() {
  validateArgs(process.argv);
  const salt = process.argv[2];
  const integer = parseInt(process.argv[3], 10)
  const result = generateHash(salt,integer);
  console.log(result);
}


main();
