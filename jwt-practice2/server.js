const express = require('express')
const app = express()
const PORT = 5005
const auth = require('./routes/auth')
const post = require('./routes/post')

app.use(express.json())

app.use('/auth', auth)
app.use('/post', post)

app.get('/', (req, res) => {
  return res.send('Hello JWT & Express!')
})

app.listen(PORT, () => {
  console.log('listening on port 5005')
})
