const fs = require('fs');
const { App } = require('./app');

const inputArgs = process.argv.slice(2);
const inputData = fs.readFileSync(inputArgs[0], 'utf-8');

const app = new App()
const output = app.start(inputData)

console.log(inputData)

console.log(output)

// for (const outputValue of output) {
//   console.log(outputValue)
// }