'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    
    static associate(models) {

      // Relacion N:N con Post
      Tag.belongsToMany(models.Post, {
        through: models.PostTag,
        foreignKey: 'idTag',
        otherKey: 'idPost',
        as: 'Posts',
      });
    }
    
  }
  Tag.init({
    idTag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tag',
    timestamps: true
  });
  return Tag;
};