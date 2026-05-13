'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    
    static associate(models) {

      // Relacion N:N con Post
      Tag.belongsToMany(models.Post, { 
        through: 'PostTags', 
        foreignKey: 'idTag', 
        as: 'Posts' 
      });
    }
    
  }
  Tag.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};