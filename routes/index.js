const express = require('express')
const route = express()

const routeUser = require('./routeUser')
const routeAdmin = require('./routeAdmin')
const rotueOrder = require('./routeOrder')
const routecar = require('./routeCar')


route.get('/', (req, res) => { res.send('test connection')})
route.use('/users', routeUser)
route.use('/admins', routeAdmin)
route.use('/orders', rotueOrder)
route.use('/cars', routecar)

module.exports = route