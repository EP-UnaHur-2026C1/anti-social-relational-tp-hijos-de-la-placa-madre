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
    idUser:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 20
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 12
    },
    apellido: {      
      type: DataTypes.STRING,
      allowNull: false,
      length: 12
    }
  }, 

  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);
  return User;
};