const { Comment, Post, User } = require('../db/models')
const appCache = require('../services/cache.service');

const actualizarFechaPost_ = async (postId) => {
    const post = await Post.findByPk(postId)

    post.changed('updatedAt', true)
    post.updatedAt = new Date()

    await post.save()
}

const getCommentsByPost = async (req, res) => {
    try {

        const { post_id } = req.params
        const cachekey = `comments_${req.params.post_id}`

        const cachedComments = appCache.get(cachekey)
        if (cachedComments) {
            console.log(`[Cache Hit]: Comentarios para el post con id ${post_id} desde la memoria RAM`)
            return res.status(200).json(cachedComments)
        }

        console.log(`[Cache Miss]: Consultando a la base de datos de SQLite...`)
        const comments = await Comment.findAll({
            where: { idPost: post_id },
            include: {
                model: User,
                as: 'User',
                attributes: ['idUser', 'nickName']
            },
            order: [['createdAt', 'DESC']]
        })

        appCache.set(cachekey, comments)
        res.status(200).json(comments)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const postCommentByPost = async (req, res) => {
    try {
        const { post_id } = req.params
        const { idUser, contenido } = req.body

        const user = await User.findByPk(idUser)
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        await Comment.create({
            idPost: post_id,
            idUser: idUser,
            contenido: contenido
        })

        await actualizarFechaPost_(post_id)

        appCache.del(`comments_${post_id}`)
        appCache.del('all_posts_key')
        console.log(`[Cache Cleaned]: Comentario creado para el post con id ${post_id}`)
        res.status(201).json({ message: 'Comentario creado exitosamente' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const putCommentByPost = async (req, res) => {
    try {
        const { post_id, comment_id } = req.params
        const { contenido } = req.body

        const commentActualizado = await Comment.findByPk(comment_id)
        await commentActualizado.update({ contenido }) 

        await actualizarFechaPost_(post_id)

        appCache.del(`comments_${post_id}`)
        appCache.del('all_posts_key')
        console.log(`[Cache Cleaned]: Comentario con id ${comment_id} actualizado`)
        res.status(200).json({ message: 'Comentario actualizado exitosamente' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const deleteCommentByPost = async (req, res) => {
    try {
        const { post_id, comment_id } = req.params

        const comment = await Comment.findByPk(comment_id)
        await comment.destroy()

        await actualizarFechaPost_(post_id)

        appCache.del(`comments_${post_id}`)
        appCache.del('all_posts_key')
        console.log(`[Cache Cleaned]: Comentario con id ${comment_id} eliminado`)
        res.status(200).json({ message: 'Comentario eliminado' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

module.exports = {
    getCommentsByPost,
    postCommentByPost,
    putCommentByPost,
    deleteCommentByPost
}
