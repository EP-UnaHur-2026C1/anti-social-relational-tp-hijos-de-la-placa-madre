const {Router} = require('express')
const { getCommentsByPost, postCommentByPost, putCommentByPost, deleteCommentByPost } = require('../controllers/comment.controller')
const {validarPostById} = require('../middlewares/postMiddleware')
const { validarCreateComment, validarUpdateComment } = require('../middlewares/commentMiddleware')
const router = Router()

// obtiene los comentarios de un post por id
router.get('/v1/posts/:post_id/comments', getCommentsByPost)

// agrega un comentario nuevo al post por id
router.post('/v1/posts/:post_id/comments', validarCreateComment, postCommentByPost)

// modifica un comentario si pertenece al post indicado
router.put('/v1/posts/:post_id/comments/:comment_id', validarUpdateComment, putCommentByPost)

// elimina un comentario si pertenece al post indicado
router.delete('/v1/posts/:post_id/comments/:comment_id', deleteCommentByPost)


module.exports = router
