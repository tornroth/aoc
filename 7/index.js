// INPUT

const fs = require('fs')
const path = require('path')
const puzzle = fs.readFileSync(path.join(__dirname, '.') + '/input.txt').toString().split('\n')

const instructions = puzzle.map(text => {
  const [ _, step, before ] = /^Step (\w) must be finished before step (\w) can begin\.$/.exec(text)
  return { step, before }
})

const steps = [...new Set([...instructions.map(i => i.step), ...instructions.map(i => i.before)])]

const charDiff = 'A'.charCodeAt(0) - 1
const stepTimeStart = 60

// HELPERS

const remove = (obj, arr) => {
  const item = arr.find(items => items === obj)
  const i = arr.indexOf(item)
  if (i >= 0) {
    arr.splice(i, 1)
  }
  return arr
}
 
// METHODS

const needs = (step) => {
  return instructions.filter(i => i.before === step).map(i => i.step)
}

const removeNeeds = (needs, steps) => {
  needs.split('').forEach(need => {
    steps.forEach(step => {
      remove(need, step.needs)
    })
  })
}

const stepTime = (step) => {
  return stepTimeStart + step.charCodeAt(0) - charDiff
}

const working = (workers) => {
  return workers
    .filter(worker => worker && worker.time > 0 && --worker.time === 0)
    .map(worker => worker.step)
    .join('')
}

// PARTS

const one = () => {
  let arr = steps.sort((a, b) => a < b ? -1 : 1)

  for (let index = 0; index < instructions.length; index++) {
    const i = instructions[index]
    let indexBefore = arr.indexOf(i.before)
    let indexStep = arr.indexOf(i.step)
    if (indexStep > indexBefore) {
      arr.splice(indexStep + 1, 0, i.before)
      arr.splice(indexBefore, 1)
      index = 0
    }
  }

  return arr.join('')
}

const two = () => {
  let stepsDone = time = 0
  const steps = one().split('').map(step => { return { step, needs: needs(step) } })
  const stepsTotal = steps.length
  const workers = [...Array(5)].map((_, id) => { return { id, step: '', time: 0 } })

  while (stepsDone < stepsTotal) {
    if (finished = working(workers)) {
      removeNeeds(finished, steps)
      stepsDone += finished.length
      if (stepsDone === stepsTotal) {
        return time
      }
    }

    next = steps.filter(n => !n.needs.length)

    workers.filter(w => w.time === 0).forEach(w => {
      if (next.length) {
        w.step = next.shift().step
        steps.splice(steps.indexOf(steps.find(n => n.step === w.step)), 1)
        w.time = stepTime(w.step)
      }
    })

    time++
  }
}

// LOG

console.log('Part one:', one())
console.log('Part two:', two())
