// INPUT

const fs = require('fs')
const path = require('path')
const puzzle = fs.readFileSync(path.join(__dirname, '.') + '/input.txt').toString().split('\n');

// METHODS

const findLength = (arr, length) => arr.filter(id => {
  for (let i = 0; i < id.length; i++) {
    if((id.match(new RegExp(id[i], 'g')) || []).length === length) {
      return true;
    }
  }
}).length

// PARTS

const one = (arr) =>  findLength(arr, 2) * findLength(arr, 3)

const two = (arr) => arr.map((id, index, arr) => {
  index++
  while (index < arr.length) {
    for (let i = 0; i < id.length; i++) {      
      if (arr[index].startsWith(id.substring(0, i)) && arr[index].endsWith(id.substring(i + 1))) {
        return id.substring(0, i) + id.substring(i + 1)
      }
    }
    index++
  }
}).filter(Boolean)[0]

// LOG

console.log('Part one:', one(puzzle))
console.log('Part two:', two(puzzle))
