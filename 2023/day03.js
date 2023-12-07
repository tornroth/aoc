const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day03.txt').toString().split('\n')

const maxRow = input.length - 1
const maxCol = input[0].length - 1
let sum = 0
let ratioSum = 0

function hasAdjacentSymbol (row, col, length) {
  let adjacents = ''

  for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, maxRow); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(col + length, maxCol); c++) {
      adjacents += input[r][c]
    }
  }

  return /[^\d.]/.test(adjacents)
}

function getNumberFromPosition (row, col) {
  if (col < 0 || col > maxCol || /[^\d]/.test(input[row][col])) {
    return null
  }

  let startCol = col
  while (startCol > 0 && /\d/.test(input[row][startCol - 1])) {
    startCol--
  }

  return Number(input[row].slice(startCol).match(/^\d+/))
}

function findAdjacentNumbers (row, col) {
  const numbers = []

  for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, maxRow); r++) {
    if (/[\d]/.test(input[r][col])) {
      numbers.push(getNumberFromPosition(r, col))
    } else {
      numbers.push(getNumberFromPosition(r, col - 1))
      numbers.push(getNumberFromPosition(r, col + 1))
    }
  }

  return numbers.filter(Boolean)
}

for (let row = 0; row < input.length; row++) {
  const line = input[row]

  // Sum all numbers that have an adjacent symbol
  let match
  const digitsRegex = /\d+/g
  while ((match = digitsRegex.exec(line)) !== null) {
    if (hasAdjacentSymbol(row, match.index, match[0].length)) {
      sum += Number(match[0])
    }
  }

  // Sum all multipliers of the adjacent numbers to a gear (asterisk)
  let gearMatch
  const gearsRegex = /\*/g
  while ((gearMatch = gearsRegex.exec(line)) !== null) {
    const adjacentNumbers = findAdjacentNumbers(row, gearMatch.index)
    ratioSum += adjacentNumbers.reduce((acc, curr) => acc * curr, Number(adjacentNumbers.length > 1))
  }
}

console.log('Part one:', sum) // 559667 (example: 4361)
console.log('Part one:', ratioSum) // 86841457 (example: 467835)
