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
      primaryKey: true, // Define 'idUser' como clave primaria
      autoIncrement: true, // Habilita auto-incremento para 'idUser'
      allowNull: false // No permite valores nulos en 'idUser'
    },
    nickName: {
      type: DataTypes.STRING,
      unique: true, // Asegura que el 'nickName' sea único en la base de datos
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
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};