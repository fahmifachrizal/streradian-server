const express = require('express')
const route = express()
const Controller = require('../controllers/controllerCar')
const {authentication, authorization} = require('../middlewares/auth')

route.get('/', authentication, Controller.getCar )
route.post('/', authentication, authorization, Controller.postCar )
route.get('/:id', authentication, authorization, Controller.getCarById )
route.put('/:id', authentication, authorization, Controller.editCarById )
route.delete('/:id', authentication, authorization, Controller.deleteCarById )

module.exports = route