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
    idImage:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idPost:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'PostImage',
    timestamps: false
  });
  return PostImage;
};