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
    idPostImage:{
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
      allowNull: false
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
    modelName: 'PostImage',
    timestamps: true,
    hooks: {
      beforeUpdate: (postImage) => {
        postImage.updatedAt = new Date();
      }
    }
  });
  return PostImage;
};