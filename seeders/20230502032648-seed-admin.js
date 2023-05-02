'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('./admin.json')
    data.forEach(el => {
      delete el.id
      el.password = hashPassword(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Admins', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', {}, {})
  }
};
