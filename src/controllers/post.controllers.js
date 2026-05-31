const { Post, PostImage, Tag, Comment } = require('../db/models')

// POST

const getAllPosts = async(req,res)=>{
    try{
        const cacheKey = 'all_posts_key'; // Definimos una clave única para esta consulta en la caché

        const cachedPosts = appCache.get(cacheKey); // Intentamos obtener los datos de la caché

        //1. [Cache Hit]: Si estaban en la RAM, los devolvemos directamente sin consultar a la Base de Datos
        if (cachedPosts) {
            console.log('[Cache Hit]: Sirviendo los posts desde la memoria RAM');
            res.set('X-Cache', 'HIT'); 
            return res.status(200).json(cachedPosts);
        }

        // 2. [Cache Miss]: Si no estaban en la RAM, vamos de forma tradicional a la Base de Datos
        console.log('[Cache Miss]: Consultando a la base de datos de SQLite...');
        const posts = await Post.findAll({
            include: [
                { 
                model: PostImage, 
                as: 'Images'
                },
                {
                    model: Tag,
                    as: 'Tags',
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Comment,
                    as: 'Comments'
                }
            ]
            })

        appCache.set(cacheKey, posts); // Almacenamos los datos en la caché para la próxima vez que se pidan
        res.set('X-Cache', 'MISS'); 

        res.status(200).json(posts)

    }catch(error){
        console.error(error)
        res.status(500).json({error : "error del Servidor"})
    }
}

const getPostById = async ( req, res ) =>{
    try{
        const { postId } = req.params;
        const cacheKey = `post_${postId}`; // Clave única para cada post

        const cachedPost = appCache.get(cacheKey); // Intentamos obtener el post de la caché

        if (cachedPost) {
            console.log(`[Cache Hit]: Sirviendo el post ${postId} desde la memoria RAM`);
            res.set('X-Cache', 'HIT'); 
            return res.status(200).json(cachedPost);
        }

        console.log(`🗄️ [Cache Miss]: Consultando a la base de datos por el post ${postId}...`);

        const post = await Post.findByPk(postId, {
            include: [
                { 
                model: PostImage, 
                as: 'Images'
                },
                {
                    model: Tag,
                    as: 'Tags',
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Comment,
                    as: 'Comments'
                }
            ]
        }) 

        appCache.set(cacheKey, post); // Almacenamos el post en la caché para la próxima vez que se pida
        res.set('X-Cache', 'MISS');

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
        
        appCache.del('all_posts_key'); // Invalida la caché de todos los posts porque se agregó uno nuevo
        console.log('[Cache Cleaned]: Se borró la caché de posts por nueva publicación');

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
        
        appCache.del('all_posts_key'); // Invalida la caché de todos los posts porque se modificó uno
        appCache.del(`post_${id}`); // Invalida la caché del post específico que se modificó
        console.log(`[Cache Cleaned]: Se borró la caché de posts y del post ${id} por actualización`);
        
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
        
        appCache.del('all_posts_key'); // Invalida la caché de todos los posts porque se eliminó uno
        appCache.del(`post_${id}`); // Invalida la caché del post específico que se eliminó
        console.log(`[Cache Cleaned]: Se borró la caché de posts y del post ${id} por eliminación`);
        
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
                idPostImage : req.params.imageId
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
        const { postId } = req.params;
        const {urlImages} = req.body 

        const newImages= urlImages.map( url => ({
            url: url,
            idPost: req.params.postId
        })) 
        
        await PostImage.bulkCreate(newImages)

        await actualizarFechaPost_(postId)

        appCache.del('all_posts_key'); 
        appCache.del(`post_${postId}`); 
        console.log(`[Cache Cleaned]: Se borró la caché del post ${postId} por agregar imágenes`);

        res.status(201).json({message: 'Fotos agregadas correctamente'})
    }catch(err){
        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})
    }
}


const putImages = async (req, res) => {
    try{
    const { postId, imageId } = req.params;
    const image = await PostImage.findOne({ 
        where:{
            idPost: req.params.postId,
            idPostImage: req.params.imageId // <-- CAMBIADO: De idImage a idPostImage 
        }
    })

    await image.update({
        url: `/images/${nombreArchivo}`
    }) 

    res.status(200).json(req.body.urlImages[0])

    await actualizarFechaPost_(req.params.postId)


    }catch(err){
        console.error(err)
        res.status(500).json({ err: 'Error del servidor'})
    }
    
}

const deleteImage = async (req, res) => {
    try {
        const image = req.modelo; 

        await image.destroy();        

        await actualizarFechaPost_(postId);
        
        appCache.del('all_posts_key');
        appCache.del(`post_${postId}`);
        console.log(`[Cache Cleaned]: Se borró la caché del post ${postId} por eliminar una imagen`);
        return res.status(200).json({ message: 'Foto eliminada con éxito' });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ err: 'Error del servidor' });
    }
};

const deleteAllImages = async (req, res) => {
    try {
        const { postId } = req.params;

        const imagenes = await PostImage.findAll({
            where:{
                idPost : postId
            }
        })

        if(imagenes.length === 0){
            return res.status(404).json({message: "el post no tiene imagenes"})
        }

        for (const image of imagenes){
            await eliminarImagen(image.url)
        }

        await PostImage.destroy({
            where :{
                idPost : postId
            }
        });

        await actualizarFechaPost_(postId);

        appCache.del(`post_${postId}`);
        appCache.del('all_posts_key');
        console.log(`[Cache Cleaned]: Se borró la caché del post ${postId} por eliminar todas las imágenes`);
        return res.status(200).json({ message: 'Todas las fotos del posteo fueron eliminadas' });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ err: 'Error del servidor' });
    }
};

const addTag = async (req, res) => {
    try {
        const { tagName } = req.body;

        const post = req.modelo;

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

        await actualizarFechaPost_(post.idPost); // Actualizamos la fecha del post porque se modificó su contenido (se agregó un tag)

        appCache.del(`post_${post.idPost}`);
        appCache.del('all_posts_key');
        console.log(`[Cache Cleaned]: Se borró la caché del post ${post.idPost} por agregar un tag`);

        const httpCode = created ? 201 : 200;
        res.status(httpCode).json({ message: 'Tag agregado al post', tag });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
}

const actualizarFechaPost_ = async (idPost) => { // -> funcion para que cuando se haga un post,put o delete en images, comentario o tag 

    // del post se modifique el campo updatedAt de modelo Post
    const post = await Post.findByPk(idPost); // busca el post por id

    post.changed('updatedAt', true); // fuerza a sequelize que modifique el campo updatedAt porque sino lo pasa por alto

    post.updatedAt = new Date(); // modifica el contenido del campo updatedAt con la fecha actual

    await post.save(); // para que impacte en la bd, probe con update pero no cambia la fecha en la bd no se porque
}

const getAllTagsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByPk(postId, {
            include: {
                model: Tag,
                as: 'Tags',
                through: {
                    attributes: []
                }
            }
        });

        res.status(200).json(post.Tags);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
}

const unlinkTag = async (req, res) => {
    try {
        const post = req.modelo;
        const tag = req.tag;

        const linked = await post.hasTag(tag);
        if (!linked) {
            return res.status(409).json({
                error: 'El tag no está vinculado a este post',
            });
        }

        await post.removeTag(tag);

        const postsWithTag = await tag.countPosts(); // Contamos cuántos posts siguen vinculados a este tag después de removerlo del post actual
        let tagRemoved = false;

        // Si el tag ya no está vinculado a ningún post, lo eliminamos de la base de datos para evitar tener tags "huérfanos" que no se usan en ningún post
        if (postsWithTag === 0) {
            await tag.destroy();
            tagRemoved = true;
        }

        await actualizarFechaPost_(post.idPost); // Actualizamos la fecha del post porque se modificó su contenido (se eliminó un tag)
        
        appCache.del(`post_${post.idPost}`);
        appCache.del('all_posts_key');
        console.log(`[Cache Cleaned]: Se borró la caché del post ${post.idPost} por eliminar un tag`);
        
        res.status(200).json({
            message: 'Tag desvinculado del post',
            tagRemoved,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = { getPostById, getAllImages, getImageById, postImages,putImages, deleteImage,deleteAllImages,
    getAllPosts, postNewPost, putPost, deletePost,
    addTag, getAllTagsByPostId, unlinkTag,
} 
