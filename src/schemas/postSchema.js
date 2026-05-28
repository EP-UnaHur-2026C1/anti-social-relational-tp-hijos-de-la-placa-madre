const Joi = require('joi')

const schemaPost = Joi.object({
    idUser: Joi.number().integer().min(1).required().messages({
        "number.base": "el idUser debe ser un numero",
        "number.integer": "el idUser debe ser un entero",
        "number.min": "el idUser no puede ser menor a 1",
        "any.required": "el atributo idUser debe existir"
    }),
    descripcion: Joi.string().min(3).max(100).required().messages({
        "string.empty": "la descripcion no puede estar vacia",
        "string.min": "la descripcion debe tener minimo 3 caracteres",
        "string.max": "la descripcion debe tener maximo 100 caracteres",
        "any.required": "el atributo descripcion debe existir",
    })
})

module.exports = { schemaPost }
