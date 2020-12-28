// INPUT

const fs = require('fs')
const puzzle = fs.readFileSync('./puzzle/day10.txt').toString().split('\n')

// HELPERS

const gcd = (x, y) => {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false
  x = Math.abs(x)
  y = Math.abs(y)
  while(y) {
    var t = y
    y = x % y
    x = t
  }
  return x
}

// VARIABLES

const rows = puzzle.length
const cols = puzzle[0].length
const scans = new Map()
let location

// METHODS

const mapScans = () => {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (puzzle[y][x] === '#') {
                scans.set([x, y].join(), new Map())
            }
        }
    }
}

const scan = () => {
    scans.forEach((map, pos) => {
        const coords = [ ...scans.keys() ]
        coords.forEach(coord => {
            if (coord === pos) return

            const [x1, y1] = coord.split(',')
            const [x2, y2] = pos.split(',')
            const x = x1 - x2
            const y = y1 - y2
            const divider = gcd(x, y)
            const dir = [x / divider, y / divider].join()
            if (!map.has(dir)) {
                map.set(dir, new Set())
            }
            map.get(dir).add([x, y].join())
        })
    })
}

const run = () => {
    mapScans()
    scan()
    return
}

// PARTS

const one = () => {
    run()
    let asteroids = 0
    scans.forEach((map, pos) => {
        if (map.size > asteroids) {
            asteroids = map.size
            location = pos
        }
    })
    return asteroids
}


const two = () => {
    const asteroids = [ ...scans.get(location).keys() ]
        .map(coord => {
            const [x, y] = coord.split(',')
            return { coord, angle: Math.abs(Math.atan2(x, y) - Math.PI) }
        })
        .sort((a, b) => a.angle - b.angle)
        .map(obj => obj.coord)
    const [xCoord, yCoord] = asteroids[199].split(',').map(Number)
    const [xLocation, yLocation] = location.split(',').map(Number)
    return 100 * (xLocation + xCoord) + yLocation + yCoord
}

// LOGS

console.log('Part One:', one()) // 221
console.log('Part Two:', two()) // 806
