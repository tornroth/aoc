const fs = require('fs')
const path = require('path')
const exampleInput = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day07.example.txt', 'utf8').trim().split('\n')
const input = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day07.txt', 'utf8').trim().split('\n')

function calculateWinnings (input, wildcard = false) {
  const cardValues = { A: 14, K: 13, Q: 12, J: 11, T: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2 }

  if (wildcard) {
    cardValues.J = 1
  }

  const rankedHands = [
    { labels: 5, highest: 1 }, // all cards' labels are different
    { labels: 4, highest: 2 }, // one pair
    { labels: 3, highest: 2 }, // two pairs
    { labels: 3, highest: 3 }, // three of a kind
    { labels: 2, highest: 3 }, // full house
    { labels: 2, highest: 4 }, // four of a kind
    { labels: 1, highest: 5 } // five of a kind
  ]

  function analyzeHand (hand) {
    const cards = hand.split('').filter((label) => !wildcard || label !== 'J')
    const counts = new Map([...new Set(cards)].map(x => [x, cards.filter(y => y === x).length]))
    const labels = counts.size
    const highest = Math.max(...counts.values()) + (5 - cards.length)

    return rankedHands.findIndex(hand => hand.labels === labels && hand.highest === highest)
  }

  const hands = input.map(line => line.split(' '))

  const sortedHands = hands.sort((a, b) => {
    const analyzeA = analyzeHand(a[0])
    const analyzeB = analyzeHand(b[0])

    if (analyzeA !== analyzeB) {
      return analyzeA - analyzeB
    }

    for (let i = 0; i < 5; i++) {
      if (cardValues[a[0][i]] !== cardValues[b[0][i]]) {
        return cardValues[a[0][i]] - cardValues[b[0][i]]
      }
    }

    return 0
  })

  let totalWinnings = 0
  for (let i = 0; i < sortedHands.length; i++) {
    totalWinnings += (i + 1) * Number(sortedHands[i][1])
  }

  return totalWinnings
}

console.log(
  'Part One:',
   `(example: ${calculateWinnings(exampleInput)})`,
   calculateWinnings(input)
) // (example: 6440) 249204891
console.log(
  'Part Two:',
  `(example: ${calculateWinnings(exampleInput, true)})`,
  calculateWinnings(input, true)
) // (example: 5905) 249997770 too high, 249614711 too low
