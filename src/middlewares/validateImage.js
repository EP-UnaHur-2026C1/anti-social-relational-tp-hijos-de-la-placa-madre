
const {PostImage} = require('../db/models')


const validatePathParameterPostImage = (req, res, next) => {
    const id = req.params.imageId

    if(isNaN(id)){
        return res.status(400).json({message: "El id de la imagen debe ser numerico"})
    }

    next()
}

const validateImageExists =  async (req, res, next) => {
    const id = req.params.imageId

    const imagen = await PostImage.findByPk(id)

        

    if(!imagen){
        return res.status(404).json({message: "No existe una imagen con ese ID"})
    }

    next()
}

const validatePutImage = async (req,res,next) => {
    const idPost = req.params.postId
    const urlImages = req.body.urlImages        

    if (urlImages.length !== 1) {
        return res.status(400).json({ message: "Solo se puede enviar una imagen a la vez" })
    }

    const newImagen = urlImages[0]
  
    const existe = await PostImage.findOne({
        where: {
            idPost: idPost,
            url: newImagen
        }
    })  

    if (existe) {
        return res.status(400).json({ message: "La imagen ya existe en el post" })
    }

    next()

}


module.exports = { validatePathParameterPostImage, validateImageExists, validatePutImage }