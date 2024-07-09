require('dotenv').config()

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET, // 秘密鍵
    options: {
      algorithm: 'HS256', // 署名アルゴリズム
      expiresIn: '1d', // tokenの有効期限
    },
  },
}
