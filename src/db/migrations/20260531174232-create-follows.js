'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idFollower: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'idUser' }, // O 'id' según tu PK de User
        onDelete: 'CASCADE'
      },
      idFollowing: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'idUser' },
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Follows');
  }
};