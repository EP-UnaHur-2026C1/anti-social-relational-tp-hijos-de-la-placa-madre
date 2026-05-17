const {Router} = require('express')
const { getPostById, getAllPosts, postNewPost, putPost, deletePost, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages  } = require('../controllers/post.controllers')
const router = Router()

// obtener todos los post por id
router.get('/posts',getAllPosts)

// obtener un post con cierto id

router.get('/post/:postId', getPostById)

// crear un nuevo post

router.post('/post',postNewPost)

// actualizar un post con id

router.put('/posts/:id',putPost)

// eliminar un post con id

router.delete('/posts/:id',deletePost)

// PARA POST_IMAGES

// obtener todas las imagenes de un post
router.get('/post/:postId/images', getAllImages)

// obtiene una imagen del post por id (?)

router.get('/post/:postId/images/:imageId', getImageById)

// agregar imagenes al post, una o muchas

router.post('/post/:postId/images', postImages)

// modifica una imagen por id (?)

router.put('/post/:postId/images/:imageId', putImages)

// borra una imagen del post por id

router.delete('/post/:postId/images/:imageId', deleteImage)

// borra todas las imagenes del post por id

router.delete('/post/:postId/images', deleteAllImages)



module.exports = router