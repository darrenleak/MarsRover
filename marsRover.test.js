const { App } = require('./app');
const testDataSpacesCleanup =
`    5 5       
          1 2 N 
LMLMLMLMM        
3 3 E
MMRMMRMRRM




`

test('Dirty input - Spaces', () => {
  const app = new App()
  let output = app.start(testDataSpacesCleanup)

  expect(output[0]).toBe('1 3 N');
  expect(output[1]).toBe('5 1 E');
});

const testDataSpacesBadCharacters =
`5 5
1 2 N 
lmlmlm
3 3 E
MMRMMRMRRM`

test('Dirty input - Bad characters', () => {
  const app = new App()

  let output = app.start(testDataSpacesBadCharacters)

  expect(output.name).toBe('Invalid rover movement')
  expect(output.message).toBe('l')
});

const plateauOne =
`10 10
0 0 S
RRMMM
0 0 S
RRMMMMMMMMMMMMMMMMMMMMMMMMMMRMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
5 5 W
MMRMMLM`

const plateauTwo = `5 3
5 3 N
MRMLMRMLMRMRMLM`

test('Rover general movements', () => {
  const app = new App()
  let output
  output = app.start(plateauOne)

  expect(output[0]).toBe('0 3 N');
  expect(output[1]).toBe('10 10 E');
  expect(output[2]).toBe('2 7 W');

  output = app.start(plateauTwo)
  expect(output[0]).toBe('5 2 E');
});

const plateauOutOfBounds = `5 3
5 4 N
LR`

test('Rover placed off plateau', () => {
  const app = new App()
  let output
  output = app.start(plateauOutOfBounds)

  expect(output[0]).toBe('5 3 N');
});
