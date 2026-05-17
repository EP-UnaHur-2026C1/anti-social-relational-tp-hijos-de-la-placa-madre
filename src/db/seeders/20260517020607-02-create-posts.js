'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        idUser: 1,
        descripcion: 'Post de ejemplo del usuario 1.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUser: 1,
        descripcion: 'Otro post de ejemplo del usuario 1.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUser: 2,
        descripcion: 'Post de ejemplo del usuario 2.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUser: 2,
        descripcion: 'Otro post de ejemplo del usuario 2.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
