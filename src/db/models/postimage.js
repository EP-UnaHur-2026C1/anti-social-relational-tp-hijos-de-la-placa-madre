'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
  
    static associate(models) {

      // Relación N:1 con Post 
      PostImage.belongsTo(models.Post, { 
        foreignKey: 'idPost', 
        as: 'Post' 
      });
      
    }
  }
  PostImage.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PostImage',
  });
  return PostImage;
};