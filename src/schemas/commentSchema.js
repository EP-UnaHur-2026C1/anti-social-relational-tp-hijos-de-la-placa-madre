const Joi = require('joi')

const createCommentSchema = Joi.object({
    idUser: Joi.number().integer().min(1).required().messages({
        'number.base': 'El idUser debe ser un numero',
        'number.integer': 'El idUser debe ser un numero entero',
        'number.min': 'El idUser no puede ser menor a 1',
        'any.required': 'El idUser es obligatorio'
    }),
    contenido: Joi.string().trim().min(1).max(255).required().messages({
        'string.base': 'El contenido debe ser texto',
        'string.empty': 'El contenido no puede estar vacio',
        'string.min': 'El contenido debe tener al menos 1 caracter',
        'string.max': 'El contenido no puede superar los 255 caracteres',
        'any.required': 'El contenido es obligatorio'
    })
})

const updateCommentSchema = Joi.object({
    contenido: Joi.string().trim().min(1).max(255).required().messages({
        'string.base': 'El contenido debe ser texto',
        'string.empty': 'El contenido no puede estar vacio',
        'string.min': 'El contenido debe tener al menos 1 caracter',
        'string.max': 'El contenido no puede superar los 255 caracteres',
        'any.required': 'El contenido es obligatorio'
    })
})

module.exports = {
    createCommentSchema,
    updateCommentSchema
}
