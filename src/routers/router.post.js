const {Router} = require('express')
const { getAllImages, getImageById, postImages, putImages, deleteImage  } = require('../controllers/post.controllers')
const router = Router()



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



module.exports = router