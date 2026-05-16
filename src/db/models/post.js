'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate(models) { 

      // 1. Relación N:1 con User
      Post.belongsTo(models.User, { 
        foreignKey: 'idUser',
        as: 'User' });
      
      // 2. Relación 1:N con PostImage
      Post.hasMany(models.PostImage, {
        foreignKey: 'idPost',
        as: 'Images' });
      
      // 3. Relación 1:N con Comment 
      Post.hasMany(models.Comment, {
        foreignKey: 'idPost', 
        as: 'Comments' });
      
      // 4. Relación M:N con Tag
      Post.belongsToMany(models.Tag, { 
        through: 'PostTags', 
        foreignKey: 'idPost', 
        as: 'Tags' 
      });

    }
  }
  Post.init({

    idPost: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false 
    },

    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    descripcion: {
      type: DataTypes.TEXT,
      length: 100,
      allowNull: false
    }
    
  }, 

  {
    sequelize,
    modelName: 'Post',
    timestamps: true
  });
  return Post;
};