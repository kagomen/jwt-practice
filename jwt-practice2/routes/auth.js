const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const { users } = require('../db/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

router.get('/', (req, res) => {
  return res.send('Hello JWT /auth!')
})

// 新規登録
router.post(
  '/sign-up',

  // バリデーションチェック
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const email = req.body.email
    const password = req.body.password

    // DBにユーザが存在しているか確認
    const user = users.find((user) => user.email === email)
    if (user) {
      return res.status(400).json({
        msg: 'すでにそのユーザーは存在しています',
      })
    }

    // パスワードのハッシュ化
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // ユーザ情報をDBへ保存
    users.push({ email, password: hashedPassword })

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
router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body

  // メールアドレスの照合
  const user = users.find((user) => user.email === email)
  if (!user) {
    return res
      .status(400)
      .json({ msg: 'そのメールアドレスは登録されていません' })
  }

  // ハッシュ化されたパスワードの照合
  const isMatched = await bcrypt.compare(password, user.password)
  if (!isMatched) {
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
