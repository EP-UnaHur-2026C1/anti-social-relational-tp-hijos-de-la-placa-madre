const {Router} = require('express')
const { getPostById, getAllPosts, postNewPost, putPost, deletePost, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages,getAllTagsByIdPost  } = require('../controllers/post.controllers')
const {validarPostById,validarSchemaPost} = require('../middlewares/postMiddleware')
const router = Router()

// obtener todos los post por id
router.get('/posts',getAllPosts)

// obtener un post con cierto id

router.get('/post/:postId',validarPostById,getPostById)

// crear un nuevo post

router.post('/post',validarSchemaPost,postNewPost)

// actualizar un post con id

router.put('/posts/:id',validarPostById,validarSchemaPost,putPost)

// eliminar un post con id

router.delete('/posts/:id',deletePost)

// PARA POST_IMAGES

// obtener todas las imagenes de un post
router.get('/post/:postId/images',validarPostById, getAllImages)

// obtiene una imagen del post por id (?)

//como le pasamos el middleware de validar "postId" tambien podriamos pasarle uno para "imageId"
router.get('/post/:postId/images/:imageId',validarPostById, getImageById)

// agregar imagenes al post, una o muchas

router.post('/post/:postId/images', postImages)

// modifica una imagen por id (?)

router.put('/post/:postId/images/:imageId', putImages)

// borra una imagen del post por id

router.delete('/post/:postId/images/:imageId', deleteImage)

// borra todas las imagenes del post por id

router.delete('/post/:postId/images', deleteAllImages)

//encuentra todos los tag que le pertenece a un post con id definido

router.get('/post/:postId/tags',getAllTagsByIdPost)



module.exports = router