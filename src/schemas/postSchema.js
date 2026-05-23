const Joi = require('joi')
//en este archivo definiremos los schemas de Objeto post, en este caso un schemas con los atributos
//y que condiciones debe de tener    

const postSchema = Joi.object({
    idUser: Joi.number().integer().min(0).required().messages({
        "integer.empty": "el idUser no puede estar vacio",
        "integer.min" : "el idUser no puede ser menor a 1",
        "integer.required": "el atributo debe existir"
    }),
    nombre: Joi.string().min(3).max(20).required().messages({
        "string.empty":"el nombre no puede estar vacio",
        "string.min" : "el nombre debe de tener minimo 3 caracteres",
        "string.max" : "el nombre debe de tener maximo 20 caracteres",
        "any.required" : "el atributo nombre debe existir",
    }),
    descripcion: Joi.string().min(3).max(40).required().messages({
        "string.empty":"la descripcion no puede estar vacio",
        "string.min" : "la descripcion debe de tener minimo 3 caracteres",
        "string.max" : "la descripcion debe de tener maximo 40 caracteres",
        "any.required" : "el atributo nombre debe existir",
    })
})

module.exports = postSchema