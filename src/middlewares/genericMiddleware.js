// Creo un archivo donde colocare todas los middlewares genericos 
//estos podemos exportarlos y usarlos en middlewares orientados a ciertos objetos

const { Post, Tag } = require('../db/models')
const postSchema = require('../schemas/postSchema')
const genericSchemaValidator = require('../schemas/genericSchemaValidator')

const validateExistsModel = (Modelo, paramName = 'id') => {
    return async (req, res, next) => {
        try {
            const id = req.params[paramName];

            // 1. Validamos el ID antes de tocar la BD
            if (!id || isNaN(id) || parseInt(id) <= 0) {
                return res.status(400).json({ error: `El parámetro ${paramName} debe ser un número entero válido y mayor a 0` });
            }

            // 2. Buscamos en el modelo si existe una instancia con ese ID
            const instancia = await Modelo.findByPk(id);

            if (!instancia) {
                return res.status(404).json({ error: `El recurso con id ${id} en el modelo ${Modelo.name} no existe` });
            }

            // 3. Guardamos la instancia para que el controlador la use gratis
            req.modelo = instancia; 
            next();

        } catch (error) {
            console.error(`Error de validación en ${Modelo.name}:`, error);
            return res.status(500).json({ error: 'Error del servidor' });
        }   
    };
};

//
const validarTagByName = (modelo, columnName, paramName, options = {}) => {
    const { instanceKey = 'instance', source = 'params' } = options

    return async (req, res, next) => {
        let value = source === 'body' ? req.body[paramName] : req.params[paramName]

        if (value === undefined || value === null || value === '') {
            res.status(400).json({ error_message: `El parametro ${paramName} es requerido` })
            return
        }

        const instance = await modelo.findOne({ where: { [columnName]: value } })

        if (!instance) {
            res.status(404).json({ error_message: `El ${modelo.name} con ${columnName} "${value}" no existe` })
            return
        }

        req[instanceKey] = instance
        next()
    }
}


const validarSchemaPost = (req,res,next) =>{
    const {error} =  genericSchemaValidator(postSchema,req.body)
    if(error){

        res.status(400).json({error : error.details.map((e) =>{
                return {
                    attributos: e.path[0],
                    detalle : e.message,
                }
            })
        }) 
        return 
    }
    
    next()
}

module.exports = { validarTagByName, validarSchemaPost, validateExistsModel }