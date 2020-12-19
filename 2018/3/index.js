// INPUT

const fs = require('fs')
const path = require('path')
const puzzle = fs.readFileSync(path.join(__dirname, '.') + '/input.txt').toString().split('\n')

const getPosAndSize = (claim) => {
  return [
    .../\@\s(\d+,\d+):/.exec(claim)[1].split(','),
    .../:\s(\d+x\d+)$/.exec(claim)[1].split('x')
  ]
}

const matrix = []

puzzle.forEach(claim => {
  const [left, top, width, height] = getPosAndSize(claim)
  let x, y
  
  x = Number(left)
  while (++x <= Number(left) + Number(width)) {
    y = Number(top)
    while (++y <= Number(top) + Number(height)) {
      if (!matrix[x]) {
        matrix[x] = []
      }
      matrix[x][y] = (matrix[x][y] || 0) + 1
    }
  }
})

// HELPERS

const sum = (arr) => arr.reduce((a, b) => a + b)

// PARTS

const one = () => {
  const doubles = matrix
    .map(row => row.filter(square => square > 1))
    .filter(row => row.length)
    .map(row => row.length)
  return sum(doubles)
}

const two = () => {
  const claim = puzzle.find(claim => {
    const [left, top, width, height] = getPosAndSize(claim)
    let x, y
    
    x = Number(left)
    while (++x <= Number(left) + Number(width)) {
      y = Number(top)
      while (++y <= Number(top) + Number(height)) {
        if (matrix[x][y] > 1) {
          return false
        }
      }
    }

    return true
  })
  return /^#(\d+) /.exec(claim)[1]
}

// LOG

console.log('Part one:', one())
console.log('Part two:', two())
