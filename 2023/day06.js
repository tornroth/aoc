const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day06.txt', 'utf8').trim().split('\n')

function parseInput (input, kernelIssue) {
  const times = kernelIssue
    ? [input[0].split(':')[1].replace(/\D/g, '')].map(Number)
    : input[0].split(':')[1].split(' ').filter(Boolean).map(Number)
  const distances = kernelIssue
    ? [input[1].split(':')[1].replace(/\D/g, '')].map(Number)
    : input[1].split(':')[1].split(' ').filter(Boolean).map(Number)

  const arr = []
  for (let i = 0; i < times.length; i++) {
    arr.push({ time: times[i], distance: distances[i] })
  }

  return arr
}

function countWaysToWin (input, kernelIssue = false) {
  const races = parseInput(input, kernelIssue)
  let totalWays = 1

  for (const race of races) {
    let ways = 0
    for (let holdTime = 0; holdTime < race.time; holdTime++) {
      const travelTime = race.time - holdTime
      const travelDistance = holdTime * travelTime
      if (travelDistance > race.distance) {
        ways++
      }
    }
    totalWays *= ways
  }

  return totalWays
}

console.log('Part One:', countWaysToWin(input)) // (example: 288) 608902
console.log('Part Two:', countWaysToWin(input, true)) // (example: 71503) 46173809
