const {Router} = require('express')
const { getPostById, getAllPosts, postNewPost, putPost, deletePost, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages  } = require('../controllers/post.controllers')
const router = Router()
const schemaValidator = require('../middlewares/schemaValidator')

// para validar schema de imagenes
const schemaImage  = require('../schemas/postimage.schema')
const {validatePathParameterPostImage, validateImageExists, validatePutImage } = require('../middlewares/validateImage')


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
router.get('/post/:postId/images',/*validar que postId sea un numero y que exista,*/getAllImages)

// obtiene una imagen del post por id (?)

router.get('/post/:postId/images/:imageId',/*validar que postId sea un numero y que exista,*/validatePathParameterPostImage, validateImageExists, getImageById)

// agregar imagenes al post, una o muchas

router.post('/post/:postId/images', /*validar que postId sea un numero y que exista,*/ schemaValidator(schemaImage.Schema) ,postImages)

// modifica una imagen por id (?)

router.put('/post/:postId/images/:imageId',/*validar que postId sea un numero y que exista,*/ validatePathParameterPostImage,validateImageExists, 
                                            schemaValidator(schemaImage.Schema), validatePutImage, putImages)

// borra una imagen del post por id

router.delete('/post/:postId/images/:imageId',/*validar que postId sea un numero y que exista,*/ validatePathParameterPostImage, validateImageExists, deleteImage)

// borra todas las imagenes del post por id

router.delete('/post/:postId/images',/*validar que postId sea un numero y que exista,*/ deleteAllImages)



module.exports = router