'use strict'

const app = require('express')()
const io = require('socket.io-client')

const qts = Number(process.argv[3])
const requestPeerSecond = Number(process.argv[2])
const HEART_BEAT_INTERVAL = 1000 / requestPeerSecond
const stats = []
let idx = 0
let intervalID

app.get('/dump', (req, res) => {
  res.json(stats)
  stats.length = 0
})

app.listen(3001)

const makeConnection = () => {
  const socket = io('ws://localhost:3000', { transports: ['websocket'] })
  idx++
  if (idx === qts) {
    clearInterval(intervalID)
    console.log('End!!!!')
  }

  socket.on('connect', () => {
    socket.on('message', message => stats.push(message))
    socket.emit('message', { req_time: Date.now() })
  })
}

intervalID = setInterval(makeConnection, HEART_BEAT_INTERVAL)
