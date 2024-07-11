const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const { users } = require('../db/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', (req, res) => {
  return res.send('Hello JWT /auth!')
})

router.get('/all-users', (req, res) => {
  return res.status(200).json(users)
})

// 新規登録
router.post(
  '/sign-up',

  // バリデーションチェック
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    console.log(users)
    const email = req.body.email
    const password = req.body.password

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // DBにユーザが存在しているか確認
    const user = users.find((user) => user.email === email)
    if (user) {
      return res.status(400).json({
        msg: 'すでにそのユーザーは存在しています',
      })
    }

    // パスワードの暗号化

    // ユーザ情報をDBへ保存
    users.push({ email, password })

    // JWTの発行
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    )

    return res.json({ token })
  }
)

// ログイン
router.post('/sign-in', (req, res) => {
  const { email, password } = req.body

  // メールアドレスの照合
  const user = users.find((user) => user.email === email)
  if (!user) {
    return res
      .status(400)
      .json({ msg: 'そのメールアドレスは登録されていません' })
  }

  // パスワードの照合
  const isMatchedUser = users.find((user) => user.password == password)
  if (!isMatchedUser) {
    return res.status(400).json({ msg: 'パスワードが一致しません' })
  }

  // JWTの発行
  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  )

  return res.json({ token })
})

module.exports = router
