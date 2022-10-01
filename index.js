const fs = require('fs');
const { App } = require('./app');

const inputArgs = process.argv.slice(2);
const inputData = fs.readFileSync(inputArgs[0], 'utf-8');

const app = new App()
app.start(inputData)