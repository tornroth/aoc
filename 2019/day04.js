const puzzle = '356261-846303'
const min = Number(puzzle.split('-')[0])
const max = Number(puzzle.split('-')[1])
const passwords = [...Array(max - min + 1).keys()].map(val => val + min)

const incOrEq = num => !!num.toString().split('').reduce((acc, cur, idx, src) => acc && cur >= acc && cur)
// const incOrEq = num => num.toString().split('').every((num, i, arr) => i + 1 === arr.length || num <= arr[i + 1])

const equals = num => num.toString().split('').some((num, i, arr) => arr.indexOf(num) !== arr.lastIndexOf(num))

const doubles = num => num.toString().split('').some((num, i, arr) => arr.indexOf(num) === arr.lastIndexOf(num) - 1)

const valid = num => incOrEq(num) && equals(num)

const validDouble = num => incOrEq(num) && doubles(num)

const partOne = () => passwords.filter(valid).length
const partTwo = () => passwords.filter(validDouble).length

console.log('Part One:', partOne()) // 544
console.log('Part Two:', partTwo()) // 334
