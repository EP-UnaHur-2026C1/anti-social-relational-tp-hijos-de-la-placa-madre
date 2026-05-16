const { Post, PostImage } = require('../db/models')
const { param } = require('../routers/router.user')




// PARA POST IMAGES 

const getAllImages = async (req, res) => {
    try {
    
        const images = await PostImage.findAll(
            {
                where: {
                    idPost : req.params.postId
                }
            }
        )

        res.status(200).json(images)
            
    }catch(err){

        console.error(err)
        res.status(500).json({ error: 'Error del servidor' })

    }
}

const getImageById = async (req, res) => {
    try{

        const image = await PostImage.findOne({
            where: {
                idPost: req.params.postId, 
                idImage : req.params.imageId
            }
        })

        res.status(200).json(image)

    }catch(err){

        console.error(err)
        res.status(500).json({ error: 'Error del servidor' })

    }
}

const postImages = async (req, res) => {
    try{

        const newImagen = {
            ...req.body,
            idPost: req.params.postId
        }

        const image = await PostImage.create(newImagen)
        res.status(201).json(newImagen)

    }catch(err){

        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})

    }
}

const putImages = async (req, res) => {
   try{
    
    const image = await PostImage.findOne({ // -> buscamos la foto por id del post y id de la imagen
        where:{
            idPost: req.params.postId, // -> donde el id del post sea el recibido por URL
            idImage: req.params.imageId // -> y donde el id de la foto sea el recibido por URL
        }
    })

    await image.update(req.body) // -> se hace la actualizacion de la foto que recibe por body

    res.status(201).json(image)


    }catch(err){
        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})
    }
    
}

const deleteImage = async (req, res) => {
    try{
        const image = await PostImage.findOne({
            where: {
                idPost: req.params.postId, 
                idImage: req.params.imageId             
            }             
        })

        await image.destroy()
        res.status(200).json( {message: 'Foto eliminada '})

    }catch(err){
        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})
    }
}


module.exports = {  getAllImages, getImageById, postImages, putImages, deleteImage } 