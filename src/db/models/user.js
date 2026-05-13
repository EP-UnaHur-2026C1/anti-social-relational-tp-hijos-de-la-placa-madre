'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {

      // 1. Relación 1:M con Post
      User.hasMany(models.Post, {
        foreignKey: "idUser",
        as: "posts",
      });

      // 2. Relación 1:M con Comment
      User.hasMany(models.Comment, {
        foreignKey: "idUser",
        as: "comments",
      });

    }
  }
  User.init({
    nickName: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};