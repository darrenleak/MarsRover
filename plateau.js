class Plateau {
  width
  height

  constructor(width, height) {
    this.width = width
    this.height = height
  }

  isOutOfBoundsForX(x) {
    if (x > this.width || x < 0) {
      return true
    }

    return false
  }

  isOutOfBoundsForY(y) {
    if (y > this.height || y < 0) {
      return true
    }

    return false
  }
}

// export default Plateau

module.exports = {
  Plateau
}