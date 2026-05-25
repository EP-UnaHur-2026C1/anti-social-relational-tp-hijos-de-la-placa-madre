// Creo un archivo donde colocare todas los middlewares genericos 
//estos podemos exportarlos y usarlos en middlewares orientados a ciertos objetos

const validarById = (modelo, paramName = 'id') => {
    // la funcion la ejecutara el modelo que la utilize por eso podemos conseguir la "id" facilmente
    return async (req, res, next) => {
        const id = req.params[paramName]

        if (!id) {
            res.status(400).json({ error_message: `El parametro ${paramName} es requerido` })
            return
        }

        const instance = await modelo.findByPk(id)

        if (!instance) {
            res.status(404).json({ error_message: `El ${modelo.name} con id ${id} no existe` })
            return
        }

        req.instance = instance
        next()
    }
}

const validarByColumn = (modelo, columnName, paramName, options = {}) => {
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

module.exports = { validarById, validarByColumn }