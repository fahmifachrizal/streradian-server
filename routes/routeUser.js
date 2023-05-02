const express = require('express')
const route = express()
const Controller = require('../controllers/controllerUser')

route.post('/login', Controller.login )
route.post('/register', Controller.register )

module.exports = route