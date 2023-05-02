'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, {foreignKey: 'userId'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: {msg: "Email must be unique"},
      validate: {
        isEmail: {msg:"Email format is invalid"},
        notNull: {msg:"Email is required"},
        notEmpty: {msg:"Email is required"}
      }
    },
    phoneNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    message: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len: {args: 6, msg: "Password is at least 6 character"},
        notNull: {msg:"Password is required"},
        notEmpty: {msg:"Password is required"}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: {msg: "Username must be unique"},
      validate: {
        notNull: {msg:"Username is required"},
        notEmpty: {msg:"Username is required"}
      }
    },
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user)=>{
    user.password = hashPassword(user.password)
  })
  return User;
};