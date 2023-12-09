const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, '.') + '/puzzle/day05.txt', 'utf8').trim().split('\n\n')

function parseInput (input, seedRanges) {
  const obj = {}

  for (const line of input) {
    const [key, value] = line.split(':')

    let prop = key.includes('map')
      ? key.replace(' map', '')
      : key

    // convert the prop string to camelCase, e.g. 'seed-to-soil' becomes 'seedToSoil'
    prop = prop.split('-').map((s, i) => i > 0 ? s[0].toUpperCase() + s.slice(1) : s).join('')

    const val = value.includes('\n')
      ? value.split('\n').slice(1).map(s => s.split(' ').map(Number))
      : value.trim().split(' ').map(Number)

    if (seedRanges && prop === 'seeds') {
      // seed ranges are given as a list of numbers, e.g. [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      // if seedRanges is true, convert this plain array to an array of arrays, each containing two numbers
      // example: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] becomes [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]

      const seeds = []
      for (let i = 0; i < val.length; i += 2) {
        seeds.push([val[i], val[i + 1]])
      }
      obj[prop] = seeds
    } else { obj[prop] = val }
  }

  return obj
}

function findLowestLocation (input, seedRanges = false) {
  const {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation
  } = parseInput(input, seedRanges)

  function getMappedNumberFromArrayMap (arr, number) {
    for (const [destinationRangeStart, sourceRangeStart, rangeLength] of arr) {
      if (number >= sourceRangeStart && number < sourceRangeStart + rangeLength) {
        return destinationRangeStart + (number - sourceRangeStart)
      }
    }
    return number
  }

  let lowestLocation = Infinity

  for (const seedData of seeds) {
    const seedArray = Array.isArray(seedData) ? seedData : [seedData, 1]
    for (let i = seedArray[0]; i <= seedArray[0] + seedArray[1]; i++) {
      const seed = i
      const soilNumber = getMappedNumberFromArrayMap(seedToSoil, seed)
      const fertilizerNumber = getMappedNumberFromArrayMap(soilToFertilizer, soilNumber)
      const waterNumber = getMappedNumberFromArrayMap(fertilizerToWater, fertilizerNumber)
      const lightNumber = getMappedNumberFromArrayMap(waterToLight, waterNumber)
      const temperatureNumber = getMappedNumberFromArrayMap(lightToTemperature, lightNumber)
      const humidityNumber = getMappedNumberFromArrayMap(temperatureToHumidity, temperatureNumber)
      const locationNumber = getMappedNumberFromArrayMap(humidityToLocation, humidityNumber)

      if (locationNumber < lowestLocation) {
        lowestLocation = locationNumber
      }
    }
  }

  return lowestLocation
}

console.log('Part one:', findLowestLocation(input)) // (example: 35) 218513636
console.log('Part two:', findLowestLocation(input, true)) // (example: 46) not enough with computer power
