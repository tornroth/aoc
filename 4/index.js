// INPUT

const fs = require('fs')
const path = require('path')
const puzzle = fs.readFileSync(path.join(__dirname, '.') + '/input.txt').toString().split('\n')

const log = puzzle
  .map(item => {
    const dateTxt = /^\[(.+)\]/.exec(item)[1]
    const min = new Date(dateTxt).getMinutes()
    const guard = /#(\d+)/.test(item) ? /#(\d+)/.exec(item)[1] : null
    const action = /#(\d+)/.test(item) ? /^\[.+#\d+\s(.+)$/.exec(item)[1] : /^\[.+\]\s(.+)$/.exec(item)[1]
    return { dateTxt, min, guard, action, text: item }
  })
  .sort((a, b) => a.dateTxt < b.dateTxt ? -1 : 1)

const map = new Map()

const guards = new Set(log.map(item => item.guard).filter(Boolean))

guards.forEach(guard => map.set(guard, {
  minute: [...Array(60)].fill(0),
  sum: 0
}))

let _from, _guard
log.forEach(item => {
  if (item.action === 'begins shift') {
    _guard = item.guard
  }
  else if (item.action === 'falls asleep') {
    _from = item.min
  }
  else {
    while (_from < item.min) {
      map.get(_guard).sum++
      map.get(_guard).minute[_from++]++
    }
  }
})

// METHODS

const getMostSleepingGuard = () => {
  let max = 0, sleepingGuard
  for (let [guard, { sum }] of map) {
    if (sum > max) {
      sleepingGuard = guard
      max = sum
    }
  }
  return sleepingGuard
}

const getMostSleepingGuardOnOneMinute = () => {
  let max = 0, sleepingGuard, top
  for (let [guard, { minute }] of map) {
    top = Math.max(...minute)
    if (top > max) {
      sleepingGuard = guard
      max = top
    }
  }
  return sleepingGuard
}

const getMostSleepingMinuteForGuard = (guard) => {
  const minutes = map.get(guard).minute
  return minutes.indexOf(Math.max(...minutes))
}

// PARTS

const one = () => {
  const guard = getMostSleepingGuard()
  const minute = getMostSleepingMinuteForGuard(guard)
  return guard * minute
}

const two = () => {
  const guard = getMostSleepingGuardOnOneMinute()
  const minute = getMostSleepingMinuteForGuard(guard)
  return guard * minute
}

// LOG

console.log('Part one:', one())
console.log('Part two:', two())
