'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Car, {foreignKey: 'carId'})
      Order.belongsTo(models.User, {foreignKey: 'userId'})
      Order.belongsTo(models.Admin, {foreignKey: 'adminId'})
    }
  }
  Order.init({
    pickUpLoc: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    dropOffLoc: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    pickUpDate: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    dropOffDate: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    pickUpTime: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    userId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};