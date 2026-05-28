const { Tag } = require('../db/models')

const validateExistsModel = (Modelo, paramName = 'id') => {
    return async (req, res, next) => {
        try {
            const id = req.params[paramName]

            if (!id || isNaN(id) || parseInt(id) <= 0) {
                return res.status(400).json({ error: `El parametro ${paramName} debe ser un numero entero valido y mayor a 0` })
            }

            const instancia = await Modelo.findByPk(id)

            if (!instancia) {
                return res.status(404).json({ error: `El recurso con id ${id} en el modelo ${Modelo.name} no existe` })
            }

            req.modelo = instancia
            next()
        } catch (error) {
            console.error(`Error de validacion en ${Modelo.name}:`, error)
            return res.status(500).json({ error: 'Error del servidor' })
        }
    }
}

const validarById = (modelo) => {
    return async (req, res, next) => {
        const id = req.params.id || req.params.postId || req.params.post_id
        const instance = await modelo.findByPk(id)

        if (!instance) {
            return res.status(404).json({ error_message: `el id ${id} no fue encontrado` })
        }

        next()
    }
}

const validarTagByName = async (req, res, next) => {
    const tagName = req.params.tagName || req.body.tagName

    if (!tagName) {
        return res.status(400).json({ error_message: 'El parametro tagName es requerido' })
    }

    const tag = await Tag.findOne({ where: { nombre: tagName } })

    if (!tag) {
        return res.status(404).json({ error_message: `El tag "${tagName}" no existe` })
    }

    req.tag = tag
    next()
}

module.exports = { validarById, validarTagByName, validateExistsModel }
