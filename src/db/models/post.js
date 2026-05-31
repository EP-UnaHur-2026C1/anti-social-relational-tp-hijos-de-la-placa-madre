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
        as: 'Images',
        onDelete: 'CASCADE', // Si se borra un post, se borran sus imágenes
        hooks: true // Necesario para que el onDelete funcione correctamente
      });
      
      // 3. Relación 1:N con Comment 
      Post.hasMany(models.Comment, {
        foreignKey: 'idPost', 
        as: 'Comments',
        onDelete: 'CASCADE', // Si se borra un post, se borran sus comentarios
        hooks: true // Necesario para que el onDelete funcione correctamente
      });
      
      // 4. Relación M:N con Tag
      Post.belongsToMany(models.Tag, {
        through: models.PostTag,
        foreignKey: 'idPost',
        otherKey: 'idTag',
        as: 'Tags',
        onDelete: 'CASCADE', // Si se borra un post, se borran sus asociaciones con tags
        hooks: true // Necesario para que el onDelete funcione correctamente
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
    
  }, 

  {
    sequelize,
    modelName: 'Post',
    timestamps: true,
    // Este hook se ejecuta antes de cada actualización de un post para actualizar el campo updatedAt automáticamente
    hooks: {
      beforeUpdate: (post) => {
        post.updatedAt = new Date();
      }
    }
  });
  return Post;
};