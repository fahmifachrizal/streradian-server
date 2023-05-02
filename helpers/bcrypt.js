const bcrypt = require('bcrypt')

const hashPassword = (password) => bcrypt.hashSync(password, 8)
const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword)

module.exports = { hashPassword, comparePassword}