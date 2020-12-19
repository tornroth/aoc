const puzzle = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 10, 1, 19, 1, 5, 19, 23, 1, 23, 5, 27, 1, 27, 13, 31, 1, 31, 5, 35, 1, 9, 35, 39, 2, 13, 39, 43, 1, 43, 10, 47, 1, 47, 13, 51, 2, 10, 51, 55, 1, 55, 5, 59, 1, 59, 5, 63, 1, 63, 13, 67, 1, 13, 67, 71, 1, 71, 10, 75, 1, 6, 75, 79, 1, 6, 79, 83, 2, 10, 83, 87, 1, 87, 5, 91, 1, 5, 91, 95, 2, 95, 10, 99, 1, 9, 99, 103, 1, 103, 13, 107, 2, 10, 107, 111, 2, 13, 111, 115, 1, 6, 115, 119, 1, 119, 10, 123, 2, 9, 123, 127, 2, 127, 9, 131, 1, 131, 10, 135, 1, 135, 2, 139, 1, 10, 139, 0, 99, 2, 0, 14, 0]

const run = (n = 12, v = 2) => {
    let integers = Array.from(puzzle)
    let pos = 0
    let opcode = integers[pos]

    integers[1] = n
    integers[2] = v

    while (opcode !== 99) {
        if (opcode === 1) {
            integers[integers[pos + 3]] = integers[integers[pos + 1]] + integers[integers[pos + 2]]
        }

        if (opcode === 2) {
            integers[integers[pos + 3]] = integers[integers[pos + 1]] * integers[integers[pos + 2]]
        }

        opcode = integers[pos += 4]
    }
    return integers[0]
}

const arr = n => [...Array(n).keys()]

const findValue = (val) => {
    for (let n of arr(100)) {
        for (let v of arr(100)) {
            if (run(n, v) === val) return 100 * n + v
        }        
    }
}

const partOne = () => run()
const partTwo = () => findValue(19690720)

console.log('Part One:', partOne()) // 3562624
console.log('Part Two:', partTwo()) // 8298
