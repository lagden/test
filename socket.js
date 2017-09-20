'use strict'

const { MongoClient } = require('mongodb')
const app = require('socket.io')(3000)
const URL = 'mongodb://localhost:27017/mongo_test'
let count = 0

app.set('transports', ['websocket'])

MongoClient.connect(URL, (err, db) => {
  console.log('mongodb connected!!!')
  app.on('connection', socket => {
    console.log(`connection ${count++}`)
    socket.on('message', message => {
      const collection = db.collection('room')
      collection
        .insert({ message: `${socket.id} -> ${Date.now()}`})
        .then(() => {
          message.socket_id = socket.id
          message.res_time = new Date().getTime()
          socket.emit('message', message)
        })
        .catch(console.log)
    })
    socket.on('disconnect', () => { console.log('disconnected') })
  })
})
