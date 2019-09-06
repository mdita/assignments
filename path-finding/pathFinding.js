const PF = require('pathfinding');

function validateArgs(args) {}
function parseCoordinates(coordinates) {
  // let coordinatesValues = new Array(6).fill(0).map(() => new Array(4).fill(0));
  let storecoordinatesValues = {}
  let x = 0;
  let y = 0;

  arrayOfCoordinates = coordinates.split(',')
  for (let i = 0; i < arrayOfCoordinates.length; i++) {
    const valueX = arrayOfCoordinates[i].substring(1, 2);
    const valueY = arrayOfCoordinates[i].substring(3, 4);

    if (x < valueX) x = valueX
    if (y < valueY) y = valueY

    if (i === 0) {
      storecoordinatesValues[`${valueY},${valueX}`] = 'S'
    } else if (i + 1 === arrayOfCoordinates.length) {
      storecoordinatesValues[`${valueY},${valueX}`] = 'E'
    } else {
      storecoordinatesValues[`${valueY},${valueX}`] = 'x'
    }

  }

  return {
    x,
    y,
    values : storecoordinatesValues
  }
}

function generatePiratesMap(data) {
  const x = parseInt(data.x, 10);
  const y = parseInt(data.y, 10)
  const values = data.values

  let matrixMap = new Array(y + 1).fill(0).map(() => new Array(x + 1).fill(0));
  let fancyStringMap = ''

  for(let row = 0; row < matrixMap.length; row++) {
    for(let col = 0; col < matrixMap[row].length; col++) {
      if (values[`${row},${col}`]) {
        matrixMap[row][col] = values[`${row},${col}`];
      } else {
        matrixMap[row][col] = '.';
      }
      fancyStringMap = fancyStringMap + matrixMap[row][col];
    }
    fancyStringMap = fancyStringMap + '\n';
  }

  console.log(fancyStringMap); // append in a file
}

function findPath() { // this should do the trick, right now is hardcoded ...
  var matrix = [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 1],
  ];

  var grid = new PF.Grid(matrix);
  var finder = new PF.AStarFinder();
  var path = finder.findPath(0, 0, 2, 2, grid);
  console.log(path);
}

function main() {
  validateArgs(process.argv); // to be validated etc. , read from a file etc.
  const coordinates = process.argv[2];
  const data = parseCoordinates(coordinates);
  generatePiratesMap(data);
  findPath(); // test
}


main();
