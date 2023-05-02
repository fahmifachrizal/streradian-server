'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('./cars.json')
    const newData = data.map(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Cars', newData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', {}, {})
  }
};
