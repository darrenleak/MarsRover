const HEADING = {
  N: 'N', 
  S: 'S', 
  E: 'E', 
  W: 'W'
}
const HEADER_LIST = [HEADING.N, HEADING.S, HEADING.E, HEADING.W]
const LEFT = 'L'
const RIGHT = 'R'
const MOVE = 'M'

class Rover {
  currentLocation = {
    x: 0, 
    y: 0
  }
  currentHeading
  plateau
  movements

  constructor(position, plateau, movements) {
    this.currentLocation = {
      x: parseInt(position.x),
      y: parseInt(position.y)
    } 
    this.currentHeading = position.heading 
    this.plateau = plateau
    this.movements = movements
  }

  run() {
    for (const movement of this.movements) {
      if (movement === MOVE) {
        this.move()
      } else {
        this.rotate(movement)
      }
    }

    return `${this.currentLocation.x} ${this.currentLocation.y} ${this.currentHeading}`
  }

  move() {
    if (this.currentHeading === HEADING.N) {
      const nextYPoint = this.currentLocation.y + 1

      if (this.plateau.isOutOfBoundsForY(nextYPoint)) {
        return
      }

      this.currentLocation = {
        x: this.currentLocation.x,
        y: nextYPoint
      }
    }

    if (this.currentHeading === HEADING.S) {
      const nextYPoint = this.currentLocation.y - 1

      if (this.plateau.isOutOfBoundsForY(nextYPoint)) {
        return
      }

      this.currentLocation = {
        x: this.currentLocation.x,
        y: nextYPoint
      }
    }

    if (this.currentHeading === HEADING.E) {
      const nextXPoint = this.currentLocation.x + 1

      if (this.plateau.isOutOfBoundsForX(nextXPoint)) {
        return
      }

      this.currentLocation = {
        x: nextXPoint,
        y: this.currentLocation.y
      }
    }

    if (this.currentHeading === HEADING.W) {
      const nextXPoint = this.currentLocation.x - 1

      if (this.plateau.isOutOfBoundsForX(nextXPoint)) {
        return
      }

      this.currentLocation = {
        x: nextXPoint,
        y: this.currentLocation.y
      }
    }
  }

  rotate(rotation) {
    if (rotation !== LEFT && rotation !== RIGHT) {
      throw new InvalidHeaderDirectionError(rotation)
    }

    this.currentHeading = this.nextStateForRotation(rotation)
  }

  nextStateForRotation(rotation) {
    const isLeftRotation = rotation === LEFT

    if (this.currentHeading === HEADING.N) {
      return isLeftRotation ? HEADING.W : HEADING.E
    }

    if (this.currentHeading === HEADING.S) {
      return isLeftRotation ? HEADING.E : HEADING.W
    }

    if (this.currentHeading === HEADING.E) {
      return isLeftRotation ? HEADING.N : HEADING.S
    }

    if (this.currentHeading === HEADING.W) {
      return isLeftRotation ? HEADING.S : HEADING.N
    }
  }
}

class InvalidHeaderDirectionError extends Error {
  constructor(message) {
    super(message)
    this.name = `Invalid Direction Chosen. Provided direction: ${message}`
  }
}

module.exports = {
  Rover,
  HEADING,
  HEADER_LIST,
  LEFT, 
  RIGHT,
  MOVE
}