const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day02.txt').toString().split('\n')

const bag = {
  red: 12,
  green: 13,
  blue: 14
}

const possibleGames = []
let sumOfPowers = 0

for (const game of input) {
  let isPossible = true
  const gameInfo = game.split(':')
  const gameID = parseInt(gameInfo[0].trim().split(' ')[1])
  const subsets = gameInfo[1].split(';')
  const gameCubes = {
    red: 0,
    green: 0,
    blue: 0
  }

  for (const subset of subsets) {
    const cubes = subset.trim().split(',')

    for (const cube of cubes) {
      const [count, color] = cube.trim().split(' ')
      gameCubes[color] = Math.max(gameCubes[color], parseInt(count))
      if (parseInt(count) > bag[color]) {
        isPossible = false
      }
    }
  }

  if (isPossible) {
    possibleGames.push(gameID)
  }
  sumOfPowers += gameCubes.red * gameCubes.green * gameCubes.blue
}

const sumOfIDs = possibleGames.reduce((a, b) => a + b, 0)

console.log('Part one:', sumOfIDs) // 3035 (example: 8)
console.log('Part two:', sumOfPowers) // 66027 (example: 2286)
