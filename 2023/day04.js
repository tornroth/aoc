const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day04.txt', 'utf8').trim().split('\n')

function cardMatches (card) {
  const [winningNumbers, yourNumbers] = card.split('|').map(s => new Set(s.trim().split(' ').map(Number).filter(Boolean)))
  const matches = [...winningNumbers].filter(n => yourNumbers.has(n))
  return matches.length
}

function scratchcardsPoints () {
  let totalPoints = 0

  for (const card of input) {
    const matches = cardMatches(card)
    totalPoints += matches > 0 ? 2 ** (matches - 1) : 0
  }

  return totalPoints
}

function totalScratchcards () {
  let totalScratchcards = 0
  const wonScratchcards = new Map()

  for (let i = 0; i < input.length; i++) {
    const card = input[i]
    const noOfCards = 1 + (wonScratchcards.get(i) || 0)
    const matches = cardMatches(card)

    for (let j = 0; j <= matches; j++) {
      wonScratchcards.set(i + j, (wonScratchcards.get(i + j) || 0) + noOfCards)
    }

    totalScratchcards += noOfCards
  }

  return totalScratchcards
}

const partOne = () => scratchcardsPoints()
const partTwo = () => totalScratchcards()

console.log('Part one:', partOne()) // 28750
console.log('Part two:', partTwo()) // 10212704
