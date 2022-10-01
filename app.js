const Parser = require('./parser')
const Plateau = require('./plateau')
const Rover = require('./rover')

class App {
  start(inputData) {
    const parser = new Parser.Parser()
    let parsedInput

    try {
      parsedInput = parser.parse(inputData)
    } catch (error) {
      return error
    }

    const plateauInput = parsedInput.plateau
    const plateau = new Plateau.Plateau(
      plateauInput.width,
      plateauInput.height
    )
    const rovers = []

    // Initialise Rovers
    for (const rover of parsedInput.rovers) {
      rovers.push(new Rover.Rover(
        rover.position, 
        plateau, 
        rover.movements
      ))
    }

    const output = []

    // Start rovers
    for (const rover of rovers) {
      output.push(rover.run())
    }

    return output
  }
}

module.exports = {
  App
}