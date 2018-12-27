// INPUT

const fs = require('fs')
const path = require('path')
const puzzle = fs.readFileSync(path.join(__dirname, '.') + '/input.txt').toString().split('\n').map(Number);

// HELPERS

const sum = (arr) => arr.reduce((a, b) => a + b)

// PARTS

const one = (arr) => sum(arr)

const two = (arr) => {
  const frequencies = new Set()
  let frequency = index = 0
  while (!frequencies.has(frequency)) {
    frequencies.add(frequency)
    frequency += arr[index++]
    if (index === arr.length) {
      index = 0
    }
  }
  return frequency
}

console.log('Part one:', one(puzzle))
console.log('Part two:', two(puzzle))
