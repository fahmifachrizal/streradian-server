const express = require('express')
const route = express()
const Controller = require('../controllers/controllerOrder')
const {authentication} = require('../middlewares/auth')

route.get('/', authentication, Controller.getOrder )
route.post('/', authentication, Controller.postOrder )
route.get('/:id', authentication, Controller.getOrderById )
route.put('/:id', authentication, Controller.editOrderById )
route.delete('/:id', authentication, Controller.deleteOrderById )

module.exports = route