const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function auth(req, res, next) {
  let token = req.header('x-auth-token')
  if (!token) res.status(401).send('Access denied. No token provided')
  try {
    jwt.verify(token, 'secretkey', (err, val) => {
      if (!err) {
        console.log(val)
        req.token = val
      }
    })

    next()
  } catch (ex) {
    res.status(400).send('Invalid Token')
  }
}
