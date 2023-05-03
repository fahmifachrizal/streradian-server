const { Order, User, Car, } = require('../models')

class Controller {
  static async getOrder(req, res, next) {
    try {
      const { isAdmin } = req.user
      let options = {
        include: [{ 
          model: User, 
          attributes: ['username']
        }, { 
          model: Car, 
          attributes: ['name', 'carType']
        }],
        order: [['createdAt','DESC']]
      }

      if (!isAdmin) {
        options.where = { userId: req.user.id }
      }

      let data = await Order.findAll(options)
      res.status(200).json({ statusCode: 200, message:'Fetched all records' , data })
    } catch (error) {
      next(error)
    }
  }

  static async postOrder(req, res, next) {
    try {
      const { isAdmin, id: userId } = req.user
      const data = req.body

      const dataOrder = { 
        pickUpLoc:data.pickUpLoc, 
        dropOffLoc:data.dropOffLoc, 
        pickUpDate:new Date(data.pickUpDate), 
        dropOffDate:new Date(data.dropOffDate), 
        pickUpTime:new Date(data.pickUpTime),
        carId:data.carId,
        userId:(isAdmin?null:userId),
        adminId:(isAdmin?userId:null)
      }
      const createdOrder = await Order.create(dataOrder)
      
      res.status(201).json({ statusCode: 201, message:'New record has been created', data:createdOrder })
        
    } catch (error) {
      next(error)
    }
  }

  static async getOrderById(req, res, next) {
      try {
        const { isAdmin } = req.user
        let { id } = req.params

        let data = await Order.findByPk(id,{
          include: [{ 
            model: User, 
            attributes: ['username']
          }, { 
            model: Car, 
            attributes: ['name', 'carType']
          }],
        })
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

  static async deleteOrderById(req, res, next) {
      try {
        const { isAdmin } = req.user
        if (!isAdmin) throw {name: 'Forbidden'}

        let { id } = req.params
        let data = await Order.findByPk(id)
        let isFound = data
        await Order.destroy({ where: { id } })
        if (!isFound) {
            throw {name: 'RecordNotFound'}
        } else {
            res.status(200).json({ statusCode: 200, message: `Record with given id {${id}} has been deleted`, data })
        }
      } catch (error) {
        next(error)
      }
  }

  static async editOrderById(req, res, next) {
    try {
      const { isAdmin, id: userId } = req.user
      const { id: OrderId } = req.params
      if (!isAdmin) throw {name: 'Forbidden'}

      const data = req.body
      const dataOrder = { 
        pickUpLoc:data.pickUpLoc, 
        dropOffLoc:data.dropOffLoc, 
        pickUpDate:new Date(data.pickUpDate), 
        dropOffDate:new Date(data.dropOffDate), 
        pickUpTime:new Date(data.pickUpTime),
        carId:data.carId,
        userId:(isAdmin?null:userId),
        adminId:(isAdmin?userId:null)
      }
      const createdOrder = await Order.update(dataOrder, { where:{id:OrderId}, returning:true })

      res.status(201).json({ statusCode: 201, message:`Record with given id: ${OrderId} has been updated`, createdOrder:createdOrder[1][0] })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller