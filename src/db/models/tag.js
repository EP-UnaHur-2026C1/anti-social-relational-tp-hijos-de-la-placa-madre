'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    
    static associate(models) {

      // Relacion N:N con Post
      Tag.belongsToMany(models.Post, { 
        through: 'PostTags', // tabla intermedia
        foreignKey: 'idTag', 
        as: 'Posts' 
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
    }
    
  }, {
    sequelize,
    modelName: 'Tag',
    timestamps: false
  });
  return Tag;
};