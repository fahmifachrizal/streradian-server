'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.belongsTo(models.Order, {foreignKey: 'carId'})
    }
  }
  Car.init({
    name: DataTypes.STRING,
    carType: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    fuel: DataTypes.FLOAT,
    image: DataTypes.STRING,
    hourRate: DataTypes.FLOAT,
    dayRate: DataTypes.FLOAT,
    monthRate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};