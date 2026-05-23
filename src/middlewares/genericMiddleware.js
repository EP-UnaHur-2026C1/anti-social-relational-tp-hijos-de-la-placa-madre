// Creo un archivo donde colocare todas los middlewares genericos 
//estos podemos exportarlos y usarlos en middlewares orientados a ciertos objetos

const validarById = (modelo) =>{
    //la funcion la ejecutara el modelo que la utilize por eso podemos  conseguir la "id" facilmente
    return (req,res,next) =>{
        const id = req.params.id
        
        const instance = await modelo.findByPK(id)

        if(!instance){
            res.status(400).json({error_message: `el id ${id} no se fue encontrado`})
        }
        next()
    }
}

module.exports = {validarById}