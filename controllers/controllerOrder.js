const { Order, User, Car, } = require('../models')

class Controller {
  static async getOrder(req, res, next) {
    try {
      let data = await Order.findAll({
        include: [{ 
          model: User, 
          attributes: ['username']
        }, { 
          model: Car, 
          attributes: ['name', 'carType']
        }],
        order: [['createdAt','DESC']]
      })
      res.status(200).json({ statusCode: 200, message:'Fetched all records' , data })
    } catch (error) {
      next(error)
    }
  }

  static async postOrder(req, res, next) {
    try {
      const { id } = req.user
      const data = req.body

      const dataOrder = { name:data.name, description:data.description, price:+data.price, imgUrl:data.imgUrl, authorId:id, categoryId:(+data.categoryId>0?+data.categoryId:'')}
      const createdOrder = await Order.create(dataOrder)
      
      res.status(201).json({ statusCode: 201, message:'New record has been created', data:createdOrder })
        
    } catch (error) {
      next(error)
    }
  }

  static async getOrderById(req, res, next) {
      try {
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
      const { id: OrderId } = req.params
      const { id } = req.user

      const data = req.body
      const dataOrder = { 
        pickUpLoc:data.pickUpLoc, 
        dropOffLoc:data.dropOffLoc, 
        pickUpDate:new Date(data.pickUpDate), 
        dropOffDate:new Date(data.dropOffDate), 
        pickUpTime:new Date(data.pickUpTime),
        carId:data.carId,
        userId:id,
        adminId:(data.adminId?+data.adminId:null)
      }
      const createdOrder = await Order.update(dataOrder, { where:{id:OrderId}, returning:true })

      res.status(201).json({ statusCode: 201, message:`Record with given id: ${OrderId} has been updated`, createdOrder })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller