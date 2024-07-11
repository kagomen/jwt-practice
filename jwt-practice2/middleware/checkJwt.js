const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(404).json({ msg: 'アクセス権限がありません' })
  }

  // tokenをデコードする
  // try{
  //   const user =
  // } catch(e){

  // }
  next()
}
