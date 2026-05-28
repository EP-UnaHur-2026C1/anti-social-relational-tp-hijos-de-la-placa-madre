const { Router } = require('express')
const router = Router()

const { Post, PostImage } = require('../db/models')
const {
    getPostById,
    getAllPosts,
    postNewPost,
    putPost,
    deletePost,
    getAllImages,
    getImageById,
    postImages,
    putImages,
    deleteImage,
    deleteAllImages,
    addTag,
    getAllTagsByPostId,
    unlinkTag,
} = require('../controllers/post.controllers')

const { validateExistsModel, validarTagByName } = require('../middlewares/genericMiddleware')
const { sanitizeTagName } = require('../middlewares/tagMiddleware')
const { validateSchema } = require('../schemas/genericSchemaValidator')
const { schemaPost } = require('../schemas/postSchema')
const { schemaPostImage } = require('../schemas/postImage.schema')
const { schemaTag } = require('../schemas/tag.schema')

// obtener todos los post
router.get('/posts', getAllPosts)

// obtener un post con cierto id
router.get('/post/:postId', validateExistsModel(Post, 'postId'), getPostById)

// crear un nuevo post
router.post('/post', validateSchema(schemaPost), postNewPost)

// actualizar un post con id
router.put('/posts/:id', validateSchema(schemaPost), validateExistsModel(Post), putPost)

// eliminar un post con id
router.delete('/posts/:id', validateExistsModel(Post), deletePost)

// PARA POST_IMAGES

// obtener todas las imagenes de un post
router.get('/post/:postId/images', validateExistsModel(Post, 'postId'), getAllImages)

// obtiene una imagen del post por id
router.get('/post/:postId/images/:imageId', validateExistsModel(Post, 'postId'), validateExistsModel(PostImage, 'imageId'), getImageById)

// agregar imagenes al post
router.post('/post/:postId/images', validateExistsModel(Post, 'postId'), validateSchema(schemaPostImage), postImages)

// modifica una imagen por id
router.put('/post/:postId/images/:imageId', validateExistsModel(Post, 'postId'), validateExistsModel(PostImage, 'imageId'), validateSchema(schemaPostImage), putImages)

// borra una imagen del post por id
router.delete('/post/:postId/images/:imageId', validateExistsModel(Post, 'postId'), validateExistsModel(PostImage, 'imageId'), deleteImage)

// borra todas las imagenes del post por id
router.delete('/post/:postId/images', validateExistsModel(Post, 'postId'), deleteAllImages)

// Tags
router.get('/posts/:postId/tags', validateExistsModel(Post, 'postId'), getAllTagsByPostId)
router.post('/posts/:postId/tags', validateExistsModel(Post, 'postId'), sanitizeTagName, validateSchema(schemaTag), addTag)
router.delete('/posts/:postId/tags/:tagName', validateExistsModel(Post, 'postId'), sanitizeTagName, validarTagByName, unlinkTag)

module.exports = router
