const express = require('express')
const route = express()
const Controller = require('../controllers/controllerAdmin')

route.post('/login', Controller.login )

module.exports = route