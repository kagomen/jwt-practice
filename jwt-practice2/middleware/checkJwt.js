const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(404).json({ msg: 'アクセス権限がありません' })
  }

  // tokenをデコードする
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    console.log('user', user)
    next()
  } catch (e) {
    return res.status(400).json({ msg: '認証に失敗しました' })
  }
}
