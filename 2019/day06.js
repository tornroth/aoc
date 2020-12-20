// INPUT

const fs = require('fs')
const puzzle = fs.readFileSync('./puzzle/day06.txt').toString().split('\n').map(row => {
    const [key, value] = row.split(')')
    return { key, value }
})

// HELPERS

const sum = (arr) => arr.reduce((a, b) => a + b)

// VARIABLES

const orbitMap = new Map()

// METHODS

const mapOrbit = async (orb = 'COM', step = 0) => {
    orbitMap.set(orb, step++)
    return Promise.all(puzzle.filter(row => row.key === orb).map(row => mapOrbit(row.value, step)))
}

const orbitPath = (orb, path = []) => {
    if (orb === 'COM') return path.reverse()
    path.push(orb)
    return orbitPath(puzzle.find(row => row.value === orb).key, path)
}

const removeArrDuplicates = (arr1, arr2) => {
    while (arr1[0] === arr2[0]) {
        arr1.shift()
        arr2.shift()
    }
    return [arr1, arr2]
}

// PARTS

const one = () => {
    mapOrbit()
    return sum(puzzle.map(row => orbitMap.get(row.value)))
}

const two = () => {
    const [you, san] = removeArrDuplicates(orbitPath('YOU'), orbitPath('SAN'))
    return you.length + san.length - 2
}

// LOGS

console.log('Part One:', one()) // 278744
console.log('Part Two:', two()) // 475
