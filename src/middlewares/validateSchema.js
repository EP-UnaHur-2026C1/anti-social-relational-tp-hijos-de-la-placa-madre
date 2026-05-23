const validateSchema = (schema) => {
    return (req, res, next) => {
        // abortEarly: false hace que Joi revise TODO el body y te devuelva todos los errores juntos, no solo el primero
        const { error } = schema.validate(req.body, { abortEarly: false }); 
        
        if (error) {
            // Mapeamos los errores para devolver un array con los mensajes que configuramos arriba
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }
        
        next();
    };
};

module.exports = {validateSchema};