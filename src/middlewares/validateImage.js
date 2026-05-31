
const {PostImage} = require('../db/models')




const validatePutImage = async (req,res,next) => {
    const idPost = req.params.postId
    const urlImages = req.body.urlImages        

    if (urlImages.length !== 1) {
        return res.status(400).json({ message: "Solo se puede enviar una imagen a la vez" })
    }

    const newImagen = urlImages[0]

   
    next()

}


module.exports = { validatePutImage }