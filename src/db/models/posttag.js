'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    static associate() {}
  }

  PostTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idPost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idTag: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PostTag',
      tableName: 'PostTags',
      timestamps: false,
    },
  );
  return PostTag;
};
