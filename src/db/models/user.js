'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {

      // Relación N:M consigo mismo para representar los seguidores y seguidos (Mis seguidos) - una parte de la relación
      User.belongsToMany(models.User, {
        through: 'Follows',
        as: "Following",
        foreignKey: "idFollower",
        otherKey: "idFollowing",
        onDelete: 'CASCADE', // Si se borra el usuario, borra sus relaciones de seguimiento
        timestamps: true
      })

      // Relación N:M consigo mismo para representar los seguidores y seguidos (Mis seguidores) - la otra parte de la relación
      User.belongsToMany(models.User, {
        through: 'Follows',
        as: "Followers",
        foreignKey: "idFollowing",
        otherKey: "idFollower",
        onDelete: 'CASCADE', // Si se borra el usuario, borra sus relaciones de seguimiento
      })

      // 1. Relación 1:M con Post
      User.hasMany(models.Post, {
        foreignKey: "idUser",
        as: "posts",
        onDelete: 'CASCADE', // Si se borra el usuario, borra sus posts
      });

      // 2. Relación 1:M con Comment
      User.hasMany(models.Comment, {
        foreignKey: "idUser",
        as: "comments",
        onDelete: 'CASCADE',
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
    modelName: 'User',
    timestamps: true,
    hooks: {
      beforeUpdate: (user) => {
        user.updatedAt = new Date();
      }
    }
  }
);
  return User;
};