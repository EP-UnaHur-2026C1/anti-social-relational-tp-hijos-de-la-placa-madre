
const validarPathParameterMiddleware = (req, res, next) => {
    const id = req.params.id
    if(isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({error: 'El id debe ser un número entero valido'})
    }
    next()
}


const validateExistsModel = (Modelo) => {
    return async (req, res, next) => {
    try {
        const id = req.params.id
        const modelo = await Modelo.findByPk(id)
        if (!modelo) {
            return res.status(404).json({ error: `El recurso con id ${id} en el modelo ${Modelo.name} no existe` })
        }
        req.modelo = modelo
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }   
    }
} // Función de orden superior que devuelve un middleware específico para el modelo dado


module.exports = { validateExistsModel, validarPathParameterMiddleware } 