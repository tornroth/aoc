const fs = require('fs')
const path = require('path')
const lines = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day01.txt').toString().split('\n')

const digitMapping = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
}

const getDigit = (val) => Number(val) ? val : digitMapping[val]

// For each line, find first and last digit, put them together to a two-digit number
// Then sum all two-digit numbers from all lines
const sumTwoDigitNumbersFromLines = ({ replaceWords } = {}) => lines.reduce((accumulator, line) => {
  const pattern = ['\\d', ...(replaceWords ? Object.keys(digitMapping) : [])].join('|')

  const regexFirst = new RegExp(pattern)
  const first = getDigit(line.match(regexFirst)[0])

  let last; let i = 0
  while (!last && i < line.length) {
    const regexLast = new RegExp(`(${pattern})(?:\\w{${i++}})$`) // match from the end
    last = getDigit(line.match(regexLast)?.[1])
  }

  return accumulator + Number(first + last)
}, 0)

const partOne = () => sumTwoDigitNumbersFromLines()
const partTwo = () => sumTwoDigitNumbersFromLines({ replaceWords: true })

console.log('Part one:', partOne()) // 54877
console.log('Part two:', partTwo()) // 54100
