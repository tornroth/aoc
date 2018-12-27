// INPUT

const fs = require('fs')
const path = require('path')
const puzzle = fs.readFileSync(path.join(__dirname, '.') + '/input.txt').toString()

// METHODS

const react = (str) => {
  let a, b, index = 0
  while (index < str.length) {
    a = str.charAt(index)
    b = str.charAt(index + 1)
    if (a.toUpperCase() === b.toUpperCase() && a !== b) {
      str = str.substring(0, index) + str.substring(index + 2)
      index--
    }
    else {
      index++
    }
  }
  return str
}

// PARTS

const one = (str) => {
  return react(str).length
}

const two = (str) => {
  const units = new Set(str.toUpperCase())
  let shortest = str.length
  units.forEach(unit => {
    shortest = Math.min(shortest, react(str.replace(new RegExp(unit, 'gi'), '')).length)
  })
  return shortest
}

// LOG

console.log('Part one:', one(puzzle))
console.log('Part two:', two(puzzle))
