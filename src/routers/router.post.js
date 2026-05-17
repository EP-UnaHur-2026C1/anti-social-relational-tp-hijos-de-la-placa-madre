const {Router} = require('express')
const { getPostById, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages,
    addTag, 
} = require('../controllers/post.controllers')
const router = Router()

// obtener todos los post por id

router.get('/post/:postId', getPostById)

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

// Tags
router.post('/posts/:postId/tags', addTag);

module.exports = router