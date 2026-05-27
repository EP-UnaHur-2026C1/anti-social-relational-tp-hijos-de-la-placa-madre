const {Router} = require('express')
const router = Router()

const { Post, PostImage } = require('../db/models')

const { getPostById, getAllPosts, postNewPost, putPost, deletePost, getAllImages, getImageById, postImages, putImages, deleteImage,deleteAllImages,
    addTag, getAllTagsByPostId, unlinkTag,
} = require('../controllers/post.controllers')

// Middlewares
const {validateExistsModel, validarTagByName } = require('../middlewares/genericMiddleware')
const { sanitizeTagName } = require('../middlewares/tagMiddleware')


// Schemas
const { validateSchema } = require('../schemas/genericSchemaValidator')
const { schemaPost } = require('../schemas/postSchema')
const { schemaImage }  = require('../schemas/postImage.schema')
const { schemaTag } = require('../schemas/tag.schema')


// obtener todos los post
router.get('/posts', getAllPosts)

// obtener un post con cierto id
router.get('/post/:postId', validateExistsModel(Post), getPostById)

// crear un nuevo post
router.post('/post', validateSchema(schemaPost), postNewPost)

// actualizar un post con id
router.put('/posts/:id', validateSchema(schemaPost), validateExistsModel(Post), putPost)

// eliminar un post con id
router.delete('/posts/:id',validateExistsModel(Post), deletePost)

// PARA POST_IMAGES

// obtener todas las imagenes de un post
router.get('/post/:postId/images', validateExistsModel(Post), getAllImages)

// obtiene una imagen del post por id (?)
router.get('/post/:postId/images/:imageId', validateExistsModel(Post, 'postId'), validateExistsModel(PostImage, 'imageId'), getImageById)

// agregar imagenes al post, una o muchas
router.post('/post/:postId/images', validateSchema(schemaImage) ,postImages)

// modifica una imagen por id (?)
router.put('/post/:postId/images/:imageId',validateExistsModel(Post, 'postId'), validateExistsModel(PostImage, 'imageId'), 
                                            validateSchema(schemaImage), putImages) // Habia dos validaciones de existencia, elimine una de ellas, la otra validacion de existencia es para validar que la imagen exista antes de modificarla

// borra una imagen del post por id
router.delete('/post/:postId/images/:imageId',validateExistsModel(Post, 'postId'), validateExistsModel(PostImage, 'imageId'), deleteImage)

// borra todas las imagenes del post por id
router.delete('/post/:postId/images',validateExistsModel(Post, 'postId'), deleteAllImages)

// Tags
router.get('/posts/:postId/tags', validateExistsModel(Post, 'postId'), getAllTagsByPostId);
router.post('/posts/:postId/tags', validateExistsModel(Post, 'postId'), sanitizeTagName, validateSchema(schemaTag), addTag);
router.delete('/posts/:postId/tags/:tagName', validateExistsModel(Post, 'postId'), sanitizeTagName, validarTagByName, unlinkTag);

module.exports = router

