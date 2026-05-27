'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class PostTag extends Model {
  static associate(models) {
    // Conexiones de la tabla pivot hacia las tablas principales
    PostTag.belongsTo(models.Post, { foreignKey: 'idPost' });
    PostTag.belongsTo(models.Tag, { foreignKey: 'idTag' });
  }
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
