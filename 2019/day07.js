// INPUT

const fs = require('fs')
const puzzle = fs.readFileSync('./puzzle/day07.txt').toString().split(',').map(Number)

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

const getParams = (integers, pos) => {
    const code = ('' + integers[pos]).padStart(5, '0')
    const params = [Number(code.slice(-2))]

    if (params[0] >= 99) return params

    params.push(integers[params[0] === 3 || Number(code[2]) ? pos + 1 : integers[pos + 1]])
    if (params[0] >= 3 && params[0] <= 4) return params

    params.push(integers[Number(code[1]) ? pos + 2 : integers[pos + 2]])
    if (params[0] >= 5 && params[0] <= 6) return params

    params.push(integers[pos + 3])
    return params
}

const run = ({
    integers = Array.from(puzzle),
    inputs = [],
    pos = 0,
}) => {
    let params = getParams(integers, pos)
    let halt = false
    let output

    while (params[0] !== 99 && !halt) {
        if (params[0] === 1) {
            integers[params[3]] = params[1] + params[2]
        }

        if (params[0] === 2) {
            integers[params[3]] = params[1] * params[2]
        }

        if (params[0] === 3) {
            if (!inputs.length) {
                halt = true
                continue
            }
            integers[params[1]] = inputs.shift()
        }

        if (params[0] === 4) {
            output = params[1]
        }

        if (params[0] === 5) {
            if (params[1]) {
                pos = params[2] - params.length
            }
        }

        if (params[0] === 6) {
            if (!params[1]) {
                pos = params[2] - params.length
            }
        }

        if (params[0] === 7) {
            integers[params[3]] = Number(params[1] < params[2])
        }

        if (params[0] === 8) {
            integers[params[3]] = Number(params[1] === params[2])
        }

        params = getParams(integers, pos += params.length)
    }

    return { done: !halt, integers, inputs, output, pos }
}

// PARTS

const one = () => {
    const outputs = []
    const phaseCombinations = permutator([ 0, 1, 2, 3, 4 ])

    phaseCombinations.forEach(phases => {
        let output
        phases.forEach(phase => {
            const inputs = [phase, output || 0]
            output = run({ inputs }).output
        });

        outputs.push(output)
    })

    return Math.max(...outputs)
}

const two = () => {
    const outputs = []
    const phaseCombinations = permutator([ 5, 6, 7, 8, 9 ])

    phaseCombinations.forEach(phases => {
        const amps = phases.map(phase => ({ inputs: [phase] }))
        let output
        while (amps.every(amp => !amp.done)) {
            amps.forEach((amp, ampIndex) => {
                amp.inputs.push(amps[(ampIndex || amps.length) - 1].output || 0)
                amps[ampIndex] = run(amp)
                output = amps[ampIndex].output
            });
        }
        outputs.push(output)
    })

    return Math.max(...outputs)
}

// LOGS

console.log('Part One:', one()) // 34852
console.log('Part Two:', two()) // 44282086
