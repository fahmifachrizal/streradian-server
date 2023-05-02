'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('./order.json')
    const newData = data.map(el => {
      delete el.id
      el.pickUpDate = new Date(el.pickUpDate)
      el.dropOffDate = new Date(el.dropOffDate)
      el.pickUpTime = new Date(el.pickUpTime)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Orders', newData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ordes', {}, {})
  }
};
