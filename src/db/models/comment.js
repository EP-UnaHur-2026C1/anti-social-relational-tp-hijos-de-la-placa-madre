'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {

      // Relación N:1 con Post 
      Comment.belongsTo(models.Post, {
        foreignKey: 'idPost',
        as: 'Post'
      })

      // Relación N:1 con User
      Comment.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'User'
      })
    }
  }
  Comment.init({
    idComment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },   

    contenido: {
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
    },

    visible: { // el atributo virtual para hacer que sea visible o no
      type: DataTypes.VIRTUAL( DataTypes.BOOLEAN, ['createdAt'] ),
        get: function(){

          const diasDisponibles = 60 // maximo de dias que puede estar visible un comentario

          const fechaCreacion = new Date(this.get('createdAt')) // la fecha en la que se creo el comentario

          const diasDeLaPublicacion = ( new Date() - fechaCreacion ) / (1000 * 60 * 60 * 24)  // fecha de hoy - fecha que se creo el comentario / el parseo a dias

          return diasDeLaPublicacion <= diasDisponibles // comparamos si la cantidad de dias que tiene el comentario es menor o igual al limite de dias
      }
    }

  },

   {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
    hooks: {
      beforeUpdate: (comment) => {
        comment.updatedAt = new Date();
      }
    }
  });

  return Comment;

};