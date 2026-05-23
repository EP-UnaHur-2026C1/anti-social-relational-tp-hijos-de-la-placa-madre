const {Router} = require('express')
const { getPostById, getAllPosts, postNewPost, putPost, deletePost, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages,
    addTag, getAllTagsByPostId, unlinkTag,
} = require('../controllers/post.controllers')
const {validarPostById} = require('../middlewares/postMiddleware')
const router = Router()
const schemaValidator = require('../middlewares/schemaValidator')

// para validar schema de imagenes
const schemaImage  = require('../schemas/postimage.schema')
const {validatePostImageId, validateImageExists, validatePutImage } = require('../middlewares/validateImage')


// obtener todos los post
router.get('/posts',getAllPosts)

// obtener un post con cierto id
router.get('/post/:postId',validarPostById,getPostById)

// crear un nuevo post
router.post('/post',postNewPost)

// actualizar un post con id
router.put('/posts/:id',validarPostById,putPost)

// eliminar un post con id
router.delete('/posts/:id',validarPostById,deletePost)

// PARA POST_IMAGES

// obtener todas las imagenes de un post
router.get('/post/:postId/images', validarPostById, getAllImages)

// obtiene una imagen del post por id (?)
router.get('/post/:postId/images/:imageId',validarPostById, validatePostImageId, validateImageExists, getImageById)

// agregar imagenes al post, una o muchas
router.post('/post/:postId/images', validarPostById, schemaValidator(schemaImage.Schema) ,postImages)

// modifica una imagen por id (?)
router.put('/post/:postId/images/:imageId',validarPostById, validateImageExists,validateImageExists, 
                                            schemaValidator(schemaImage.Schema), validatePutImage, putImages)

// borra una imagen del post por id
router.delete('/post/:postId/images/:imageId',/*validar que postId sea un numero y que exista,*/ validateImageExists, validateImageExists, deleteImage)

// borra todas las imagenes del post por id
router.delete('/post/:postId/images',/*validar que postId sea un numero y que exista,*/ deleteAllImages)

// Tags
router.post('/posts/:postId/tags', addTag);
router.get('/posts/:postId/tags', getAllTagsByPostId);
router.delete('/posts/:postId/tags/:tagName', unlinkTag);

module.exports = router