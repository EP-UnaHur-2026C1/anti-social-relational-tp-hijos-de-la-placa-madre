const { Post, PostImage, Tag } = require('../db/models')




// POST

const getPostById = async ( req, res ) =>{

    try{

        const post = await Post.findByPk(req.params.postId,  // -> buscamos el post por id
            {
            include: { // -> pero que incluya: 
                model: PostImage, // -> el modelo que maneja las imagenes
                as: 'Images' // -> pero como nombramos a postImages en la relacion post con postImage ( fijarse en el modelo postimage), si no ponemos esto tirar error
                            // porque no encuentra el modelo
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

        res.status(200).json( {message: 'fotos eliminadas'} )

    }catch(err){
        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})
    }
}

const addTag = async (req, res) => {
    try {
        const { postId } = req.params;
        const { tagName } = req.body;

        // TODO: validar - Validaciones de este caso de uso en middleware con Zod
        // Buscar el post por su ID
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        // TODO: validar - Transformar en middleware de validación con Zod
        // Buscar o crear el tag por su nombre
        // Docs: https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findorcreate
        let [tag, created] = await Tag.findOrCreate({
            where: { nombre: tagName },
            defaults: { nombre: tagName }
        });

        // Verificar si el post ya tiene este tag
        const hasTag = await post.hasTag(tag);
        if (hasTag) {
            return res.status(200).json({
                message: 'El post ya tiene este tag',
                tag
            });
        }

        // Asociar el tag al post (si no está asociado)
        await post.addTag(tag);

        const httpCode = created ? 201 : 200;
        res.status(httpCode).json({ message: 'Tag agregado al post', tag });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
}

module.exports = { getPostById, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages,
    addTag
 } 