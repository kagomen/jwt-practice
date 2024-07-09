const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello JWT!')
})

app.listen('5005', () => {
  console.log('listening on port 5005')
})
