const jwt = require('jsonwebtoken')
const secret = 'steradian'

const tokenGenerator = (payload) => jwt.sign(payload, secret)
const tokenDecoder = (token) => jwt.verify(token, secret)

module.exports = { tokenGenerator, tokenDecoder }