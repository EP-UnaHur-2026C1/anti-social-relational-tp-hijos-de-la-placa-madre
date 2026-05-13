'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {

      // Relación N:1 con Post 
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'Post'
      })

      // Relación N:1 con User
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      })
    }
  }
  Comment.init({
    contenido: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};