// INPUT

const fs = require('fs')
const puzzle = fs.readFileSync('./puzzle/day09.txt').toString().split(',').map(Number)

// HELPERS

const sum = (arr) => arr.reduce((a, b) => a + b)

const permutator = (inputArr) => {
    const result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)
    return result;
}

// METHODS
const getParams = (integers, pos, base) => {
    const code = ('' + integers[pos]).padStart(5, '0')
    const op = Number(code.slice(-2))
    const params = [op]

    const getValue = (mode, relPos) => {
        mode = Number(mode)
        const write = op === 3 || relPos === 3
        const modes = {
            0: integers[pos + relPos],
            1: pos + relPos,
            2: base + integers[pos + relPos]
        }
        const pointer = modes[mode]

        return write ? pointer : integers[pointer]
    }

    // return without parameters
    if (op >= 99) return params

    // return with one parameter
    params.push(getValue(code[2], 1))
    if ([3, 4, 9].includes(op)) return params

    // return with two parameters
    params.push(getValue(code[1], 2))
    if ([5, 6].includes(op)) return params

    // return with three parameters
    params.push(getValue(code[0], 3))
    return params
}

const run = ({
    integers = Array.from(puzzle),
    inputs = [],
    pos = 0,
}) => {
    let base = 0
    let [op, ...params] = getParams(integers, pos, base)
    let halt = false
    let output

    while (op !== 99 && !halt) {
        if (op === 1) {
            integers[params[2]] = params[0] + params[1]
        }

        if (op === 2) {
            integers[params[2]] = params[0] * params[1]
        }

        if (op === 3) {
            if (!inputs.length) {
                halt = true
                continue
            }
            integers[params[0]] = inputs.shift()
        }

        if (op === 4) {
            output = params[0]
        }

        if (op === 5) {
            if (params[0]) {
                pos = params[1] - params.length - 1
            }
        }

        if (op === 6) {
            if (!params[0]) {
                pos = params[1] - params.length - 1
            }
        }

        if (op === 7) {
            integers[params[2]] = params[0] < params[1]
        }

        if (op === 8) {
            integers[params[2]] = params[0] === params[1]
        }

        if (op === 9) {
            base += params[0]
        }

        params = getParams(integers, pos += params.length + 1, base)
        op = params.shift()
    }

    return { done: !halt, integers, inputs, output, pos }
}

// PARTS

const one = () => {
    return run({ inputs: [1] }).output
}

const two = () => {
    return run({ inputs: [2] }).output
}

// LOGS

console.log('Part One:', one()) // 3512778005
console.log('Part Two:', two()) // 35920
