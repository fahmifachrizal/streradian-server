const { Car } = require('../models')

class Controller {
  static async getCar(req, res, next) {
    try {
      let data = await Car.findAll()
      res.status(200).json({ statusCode: 200, message:'Fetched all records' , data })
    } catch (error) {
      next(error)
    }
  }

  static async postCar(req, res, next) {
    try {
      const { id, isAdmin } = req.user
      const data = req.body

      if (isAdmin) throw {name: 'Forbidden'}

      const dataCar = { 
        name:data.name, 
        carType:data.carType, 
        rating:+data.rating, 
        fuel:+data.fuel, 
        image:+data.image,
        hourRate:+data.hourRate,
        dayRate:(+data.dayRate?+data.dayRate:data.hourRate*24),
        monthRate:(+data.monthRate?+data.monthRate:data.hourRate*24*30),  
      }
      const createdCar = await Car.create(dataCar)
      
      res.status(201).json({ statusCode: 201, message:'New record has been created', data:createdCar })
        
    } catch (error) {
      next(error)
    }
  }

  static async getCarById(req, res, next) {
      try {
          let { id } = req.params
          

          let data = await Car.findByPk(id)
          let isFound = data
          if (isFound) {
              res.status(200).json({ statusCode: 200, message: `Fetched record with given id: ${id}`, data })
          } else {
              throw {name: 'RecordNotFound'}
          }

      } catch (error) {
          next(error)
      }
  }

  static async deleteCarById(req, res, next) {
      try {
          let { id, isAdmin } = req.params
          if (isAdmin) throw {name: 'Forbidden'}

          let data = await Car.findByPk(id)
          let isFound = data
          await Car.destroy({ where: { id } })
          if (!isFound) {
              throw {name: 'RecordNotFound'}
          } else {
              res.status(200).json({ statusCode: 200, message: `Record with given id {${id}} has been deleted`, data })
          }
      } catch (error) {
          next(error)
      }
  }

  static async editCarById(req, res, next) {
    try {
      const { id: CarId } = req.params
      const { id, isAdmin } = req.user
      if (isAdmin) throw {name: 'Forbidden'}

      const data = req.body
      const dataCar = { 
        name:data.name, 
        carType:data.carType, 
        rating:+data.rating, 
        fuel:+data.fuel, 
        image:+data.image,
        hourRate:+data.hourRate,
        dayRate:(+data.dayRate?+data.dayRate:data.hourRate*24),
        monthRate:(+data.monthRate?+data.monthRate:data.hourRate*24*30),  
      }
      const createdCar = await Car.update(dataCar, { where:{id:CarId}, returning:true })

      res.status(201).json({ statusCode: 201, message:`Record with given id: ${CarId} has been updated`, createdCar })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller