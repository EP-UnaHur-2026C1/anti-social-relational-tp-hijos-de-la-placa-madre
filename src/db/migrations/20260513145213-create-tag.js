'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
      idTag: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('PostTags', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idPost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'idPost',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      idTag: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'idTag',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addIndex('PostTags', ['idPost', 'idTag'], {
      name: 'PostTags_idPost_idTag_unique',
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('PostTags', 'PostTags_idPost_idTag_unique');
    await queryInterface.dropTable('PostTags');
    await queryInterface.dropTable('Tags');
  }
};