'use strict'

const dump = require('./dump.json')

const totalEvents = dump.length
const intervals = []

dump.forEach(event => {
  intervals.push(event.res_time - event.req_time)
})

const media = intervals.reduce((a, b) => a + b) / totalEvents

console.log(`\n ${media} ms`)
