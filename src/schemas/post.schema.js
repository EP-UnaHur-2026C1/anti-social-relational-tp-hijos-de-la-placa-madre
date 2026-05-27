const Joi = require('joi');

const SchemaPost = Joi.object({
    // Validamos el ID del usuario que crea el posteo
    idUser: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'El ID de usuario debe ser un número',
            'number.integer': 'El ID de usuario debe ser un número entero',
            'any.required': 'El ID de usuario es un campo requerido'
        }),

    // Validamos el texto del posteo
    descripcion: Joi.string()
        .min(3)
        .max(500)
        .required()
        .messages({
            'string.base': 'La descripción debe ser un texto',
            'string.empty': 'La descripción no puede estar vacía',
            'string.min': 'La descripción debe tener al menos {#limit} caracteres',
            'string.max': 'La descripción no puede superar los {#limit} caracteres',
            'any.required': 'La descripción es requerida'
        }),

    // Si mandan tags al crear el post, deben ser un array de strings (ej: ["nodejs", "express"])
    // Recordá que tu middleware sanitizeTagName se encargará de limpiarlos después
    tags: Joi.array()
        .items(Joi.string().trim().min(1))
        .optional()
        .messages({
            'array.base': 'Los tags deben venir en formato de lista (array)',
            'string.min': 'El nombre del tag no puede estar vacío'
        }),

    // Si mandan imágenes al crear el post, deben ser un array de URLs válidas
    images: Joi.array()
        .items(Joi.string().uri())
        .optional()
        .messages({
            'array.base': 'Las imágenes deben venir en formato de lista (array)',
            'string.uri': 'Cada imagen debe ser una URL válida (ej: http://... o https://...)'
        })
});

module.exports = { SchemaPost };