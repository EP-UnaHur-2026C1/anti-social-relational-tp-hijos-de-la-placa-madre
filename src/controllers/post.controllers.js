const { Post, PostImage } = require('../db/models')

// POST

const getAllPosts = async(req,res)=>{
    try{
        const data = await Post.findAll(  {
            include: { 
                model: PostImage, 
                as: 'Images' 
                }
            }    )
        res.status(200).json(data)
    }catch(error){
        console.error(error)
        res.status(404).json({error : "error del Servidor"})
    }
}

const getPostById = async ( req, res ) =>{

    try{

        const post = await Post.findByPk(req.params.postId,  
            {
            include: { 
                model: PostImage, 
                as: 'Images' 
                }
            }       
        ) 

        res.status(200).json(post)
    }catch(err){
        console.error(err)
        console.log(err)
        res.status(500).json({ error: 'Error del servidor' })
    }

}

const postNewPost = async (req, res) =>{
    try {
        const newPost = req.body

        const post = await Post.create(newPost)
        
        res.status(201).json(post)
    } catch (error) {
        
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}
const putPost = async(req,res) =>{
    try{
        const  id = req.params.id 
        const postActualizado = req.body
        
        const post = await Post.findByPk(id)
        
        await post.update(postActualizado)
        
        res.status(200).json(post)

    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })         
    }
}
const deletePost= async (req,res)=>{
    try{
        const id = req.params.id
        const post = await Post.findByPk(id)
    
        await post.destroy()
        
        res.status(200).json({message: `el post fue eliminado`})
        
    }catch(error){
        
        console.error(error)
        res.status(500).json({error: "Error de servidor"})

    }
}





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

        await actualizarFechaPost_(req.params.postId)

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

    await actualizarFechaPost_(req.params.postId)


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

        await actualizarFechaPost_(req.params.postId)

        res.status(200).json( {message: 'Foto eliminada '})

    }catch(err){
        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})
    }
}

const deleteAllImages = async ( req, res ) => {
    try{

        const images = await PostImage.findAll({
            where: {
                idPost: req.params.postId
            }            
        })

        await Promise.all(
            images.map( i => i.destroy() )
        )

        await actualizarFechaPost_(req.params.postId)

        res.status(200).json( {message: 'fotos eliminadas'} )

    }catch(err){
        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})
    }
}


const actualizarFechaPost_ = async (idPost) => { // -> funcion para que cuando se haga un post,put o delete en images o comentario 
                                                // del post se modifique el campo updatedAt de modelo Post

    
    const post = await Post.findByPk(idPost); // -> busca el post por id

    post.changed('updatedAt', true); // fuerza a sequelize que modifique el campo updatedAt porque sino lo pasa por alto

    post.updatedAt = new Date(); // modifica el contenido del campo updatedAt con la fecha actual

    await post.save(); // para que impacte en la bd, probe con update pero no cambia la fecha en la bd no se porque
  
}

module.exports = { getAllPosts, postNewPost, putPost, deletePost, getPostById, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages } 