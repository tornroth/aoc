// INPUT

const fs = require('fs')
const puzzle = fs.readFileSync('./puzzle/day11.txt').toString().split(',').map(Number)

// VARIABLES

let direction
let position = [0, 0]
const panel = new Map()

// METHODS
const paint = color => {
    panel.set(position.join(), color)
}

const turnAndGo = turn => { // 0 = UP, 1 = RIGHT, 2 = DOWN, 3 = LEFT
    direction = ((direction || 0) + (turn || -1) + 4) % 4
    position[(direction + 1) % 2] += direction <= 1 ? 1 : -1
}

const getColor = () => {
    const pos = position.join()
    return panel.has(pos) ? panel.get(pos) : 0
}

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
    base = 0,
    integers = Array.from(puzzle),
    inputs = [],
    pos = 0
}) => {
    let [op, ...params] = getParams(integers, pos, base)
    let halt = false
    let output
    let outputs = []

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
            outputs.push(output)
        }

        if (op === 5) {
            if (!params[1]) {
                console.log(pos, op, params)
            }
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
            integers[params[2]] = Number(params[0] < params[1])
        }

        if (op === 8) {
            integers[params[2]] = Number(params[0] === params[1])
        }

        if (op === 9) {
            base += params[0]
        }

        params = getParams(integers, pos += params.length + 1, base)
        op = params.shift()
    }

    return { base, done: !halt, integers, inputs, output, outputs, pos }
}

const emergencyHullPaintingRobot = (startColor = 0) => {
    direction = null
    position = [0, 0]
    panel.clear()
    panel.set(position.join(), startColor)
    let intCode = {}
    while (!intCode.done) {
        intCode = run({ base: intCode.base, integers: intCode.integers, inputs: [getColor()], pos: intCode.pos })
        const [color, turn] = intCode.outputs
        paint(color)
        turnAndGo(turn)
    }
}

const registrationIdentifier = () => {
    const coords = [ ...panel.keys() ].map(coord => coord.split(',').map(Number))
    const xDiff = Math.abs(Math.min(...coords.map(coord => coord[0])))
    const yDiff = Math.abs(Math.min(...coords.map(coord => coord[1])))
    const xLength = xDiff + 1 + Math.max(...coords.map(coord => coord[0]))
    const yLength = yDiff + 1 + Math.max(...coords.map(coord => coord[1]))

    const regId = [ ...new Array(yLength) ].map(() => [ ...new Array(xLength) ].map(() => ' '))

    panel.forEach((color, pos) => {
        const [x, y] = pos.split(',').map(Number)
        regId[yLength - 1 - (yDiff + y)][xDiff + x] = color ? '█' : ' '
    })

    return regId.map(row => row.join('')).join('\n')
}
 
// PARTS

const one = () => {
    emergencyHullPaintingRobot()
    return panel.size
}

const two = () => {
    emergencyHullPaintingRobot(1)
    return '\n' + registrationIdentifier()
}

// LOGS

console.log('Part One:', one()) // 1885
console.log('Part Two:', two()) // BFEAGHAF

//  ███  ████ ████  ██   ██  █  █  ██  ████   
//  █  █ █    █    █  █ █  █ █  █ █  █ █      
//  ███  ███  ███  █  █ █    ████ █  █ ███    
//  █  █ █    █    ████ █ ██ █  █ ████ █      
//  █  █ █    █    █  █ █  █ █  █ █  █ █      
//  ███  █    ████ █  █  ███ █  █ █  █ █      