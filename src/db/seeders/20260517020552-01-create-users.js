'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        nickName: 'nicod',
        nombre: 'Nicolás',
        apellido: 'Diorio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nickName: 'jdoe',
        nombre: 'Juan',
        apellido: 'Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
