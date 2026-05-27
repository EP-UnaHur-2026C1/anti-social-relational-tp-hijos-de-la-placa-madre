// Creo un archivo donde colocare todas los middlewares genericos 
//estos podemos exportarlos y usarlos en middlewares orientados a ciertos objetos

const validarById = (modelo) =>{
    return async (req,res,next) =>{
        const id = req.params.id || req.params.postId || req.params.post_id
        
        const instance = await modelo.findByPk(id)

        if(!instance){
            return res.status(404).json({error_message: `el id ${id} no fue encontrado`})
        }

        next()
    }
}

module.exports = {validarById}
