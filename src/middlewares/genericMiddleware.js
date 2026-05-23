// Creo un archivo donde colocare todas los middlewares genericos 
//estos podemos exportarlos y usarlos en middlewares orientados a ciertos objetos

const validarById = (modelo, paramName = 'id') => {
    // la funcion la ejecutara el modelo que la utilize por eso podemos conseguir la "id" facilmente
    return async (req, res, next) => {
        const id = req.params[paramName]

        if (!id) {
            res.status(400).json({ error_message: `el id ${paramName} no se fue encontrado` })
            return
        }

        const instance = await modelo.findByPk(id)

        if (!instance) {
            res.status(400).json({ error_message: `el id ${id} no se fue encontrado` })
            return
        }

        req.instance = instance
        next()
    }
}

module.exports = { validarById }