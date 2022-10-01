const { HEADER_LIST, LEFT, RIGHT, MOVE } = require('./rover')

class Parser {
  #parsedInput = {
    plateau: {
      width: 0, 
      height: 0
    },
    rovers: []
  }

  parse(commandString) {
    const separatedCommands = commandString.split('\n')
    const [ plateauInputWidth, plateauInputHeight ] = separatedCommands.shift().trim().split(' ')

    if (plateauInputWidth < 1 || plateauInputHeight < 1) {
      throw new PlateauCreationError(`${plateauInputWidth}, ${plateauInputHeight}`)
    }

    this.#parsedInput.plateau = {
      width: plateauInputWidth,
      height: plateauInputHeight
    }

    for (let x = 0; x < separatedCommands.length; x += 2) {
      const trimmedPosition = separatedCommands[x].trim()
      
      if (trimmedPosition.length === 0) {
        continue
      }

      const parsedPosition = trimmedPosition.split(' ')
      const { 
        roverX, 
        roverY,
        roverHeading
      } = this.validateAndReturnPositionData(parsedPosition) 
      
      const movements = separatedCommands[x + 1].trim().split('')
      this.validateMovements(movements)

      this.#parsedInput.rovers.push({
        position: {
          x: roverX,
          y: roverY,
          heading: roverHeading
        },
        movements
      })
    }

    return this.#parsedInput
  }

  getParsedInput() {
    return this.#parsedInput
  }

  validateAndReturnPositionData(parsedPosition) {
    if (parsedPosition.length < 3) {
      throw new InvalidRoverPosition(parsedPosition)
    }

    const roverHeading = parsedPosition[parsedPosition.length - 1]
    if (!HEADER_LIST.includes(roverHeading)) {
      throw new InvalidRoverHeading(roverHeading)
    }

    const [ roverX, roverY ] = parsedPosition
    if (isNaN(roverX) || isNaN(roverY)) {
      throw new InvalidRoverPosition(parsedPosition)
    }

    return {
      roverX,
      roverY,
      roverHeading
    }
  }

  validateMovements(movements) {
    const validMovements = [ LEFT, RIGHT, MOVE ]

    for (const movement of movements) {
      if (!validMovements.includes(movement)) {
        throw new InvalidRoverMovement(movement)
      }
    }
  }
}

class PlateauCreationError extends Error {
  constructor(message) {
    super(message)
    this.name = `Error creating Plateau, input needs to be bigger than 0, given input(x, y)`
  }
}

class InvalidRoverPosition extends Error {
  constructor(message) {
    super(message)
    this.name = `Invalid rover position provided`
  }
}

class InvalidRoverHeading extends Error {
  constructor(message) {
    super(message)
    this.name = `Invalid rover heading provided`
  }
}

class InvalidRoverMovement extends Error {
  constructor(message) {
    super(message)
    this.name = `Invalid rover movement`
  }
}

module.exports = {
  Parser
}