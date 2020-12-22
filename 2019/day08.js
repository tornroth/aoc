// INPUT

const fs = require('fs')
const puzzle = fs.readFileSync('./puzzle/day08.txt').toString()

// HELPERS

const chunkSubstr = (str, size) => {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}

const occurrences = (str, char) => str.split(char).length - 1

// PARTS

const one = () => {
    let zeroMap = new Map()
    const layers = chunkSubstr(puzzle, 25 * 6)
    for (let i = 0; i < layers.length; i++) {
        zeroMap.set(occurrences(layers[i], '0'), i)
    }
    const fewestZeros = Math.min(...zeroMap.keys())
    const layer = layers[zeroMap.get(fewestZeros)]
    return occurrences(layer, '1') * occurrences(layer, '2')
}

const two = () => {
    let img = ''
    const len = 25 * 6
    const layers = chunkSubstr(puzzle, len)
    for (let i = 0; i < len; i++) {
        let index = 0
        let pxl = '2'
        while (pxl === '2') {
            pxl = layers[index++][i]
        }
        img += Number(pxl) ? '█' : ' '
    }
    const rows = chunkSubstr(img, 25)
    return '\n' + rows.join('\n')
}

// LOGS

console.log('Part One:', one()) // 2356
console.log('Part Two:', two()) // PZEKB

// ███  ████ ████ █  █ ███  
// █  █    █ █    █ █  █  █ 
// █  █   █  ███  ██   ███  
// ███   █   █    █ █  █  █ 
// █    █    █    █ █  █  █ 
// █    ████ ████ █  █ ███  
