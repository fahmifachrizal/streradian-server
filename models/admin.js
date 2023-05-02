'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.hasMany(models.Order, {foreignKey: 'adminId'})
    }
  }
  Admin.init({
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
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len: {args: 6, msg: "Password is at least 6 character"},
        notNull: {msg:"Password is required"},
        notEmpty: {msg:"Password is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.beforeCreate((admin)=>{
    admin.password = hashPassword(user.password)
  })
  return Admin;
};