// INPUT

const fs = require('fs')
const path = require('path')
const puzzle = fs.readFileSync(path.join(__dirname, '.') + '/input.txt').toString().split('\n')

const coords = puzzle.map(pos => {
  const [x, y] = pos.split(', ').map(Number)
  return { x, y }
})

const min = {
  x: Math.min(...coords.map(coord => coord.x)),
  y: Math.min(...coords.map(coord => coord.y))
}

const max = {
  x: Math.max(...coords.map(coord => coord.x)),
  y: Math.max(...coords.map(coord => coord.y))
}

// HELPERS

const getDistance = (from, to) => {
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y)
}

const sum = (arr) => arr.reduce((a, b) => a + b)

// METHODS

const getFinites = () => {
  const finites = new Map()
  const infinites = new Set()
  const matrix = []

  for (let x = min.x; x <= max.x; x++) {
    matrix[x] = []
    for (let y = min.y; y <= max.y; y++) {
      matrix[x][y] = { dist: Number.MAX_VALUE }

      coords.forEach((coord, index) => {
        const dist = getDistance(coord, { x, y })
        const matrixDist = matrix[x][y].dist
        if (dist <= matrixDist) {
          matrix[x][y] = { dist, index: dist === matrixDist ? '.' : index } 
        }
      })

      if ([min.x, max.x].includes(x) || [min.y, max.y].includes(y)) {
        infinites.add(matrix[x][y].index)
      }

    }
  }

  [].concat.apply([],matrix)
    .filter(location => location && !infinites.has(location.index))
    .forEach(location => {
      finites.set(location.index, finites.has(location.index) ? finites.get(location.index) + 1 : 1)
    })

  return finites
}

// PARTS

const one = () => {
  return Math.max(...getFinites().values())
}

const two = () => {
  let size = 0
  for (let x = min.x; x <= max.x; x++) {
    for (let y = min.y; y <= max.y; y++) {
      if (sum(coords.map(coord => getDistance(coord, { x, y }))) < 10000) {
        size++
      }
    }
  }
  return size
}

// LOG

console.log('Part one:', one())
console.log('Part two:', two())
