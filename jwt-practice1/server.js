const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./config')
const auth = require('./auth')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello JWT!')
})

// 登録
app.post('/register', (req, res) => {
  const payload = {
    username: req.body.username,
    email: req.body.email,
  }

  const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)

  const body = {
    ...payload,
    token: token,
  }

  res.status(200).json(body)
})

// 認証
app.get('/sign-in', auth, (req, res) => {
  res.status(200).json({
    msg: '認証に成功しました',
  })
})

app.listen(5005, () => {
  console.log('listening on port 5005')
})
