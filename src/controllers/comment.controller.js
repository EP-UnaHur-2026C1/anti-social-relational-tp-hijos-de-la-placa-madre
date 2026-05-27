const { Comment, Post, User } = require('../db/models')

const buscarPostPorId_ = async (postId, res) => {
    const post = await Post.findByPk(postId)

    if (!post) {
        res.status(404).json({ error: 'Post no encontrado' })
        return null
    }

    return post
}

const buscarComentarioDelPost_ = async (postId, commentId, res) => {
    const comment = await Comment.findOne({
        where: {
            idPost: postId,
            idComment: commentId
        }
    })

    if (!comment) {
        res.status(404).json({ error: 'Comentario no encontrado para este post' })
        return null
    }

    return comment
}

const actualizarFechaPost_ = async (postId) => {
    const post = await Post.findByPk(postId)

    post.changed('updatedAt', true)
    post.updatedAt = new Date()

    await post.save()
}

// luca: Esta validacion queda como defensa extra; la validacion principal esta en commentMiddleware.
const validarContenido_ = (contenido, res) => {
    if (typeof contenido !== 'string' || contenido.trim() === '') {
        res.status(400).json({ error: 'El contenido del comentario es obligatorio' })
        return false
    }

    return true
}

const getCommentsByPost = async (req, res) => {
    try {
        const { post_id } = req.params

        const post = await buscarPostPorId_(post_id, res)
        if (!post) return

        const comments = await Comment.findAll({
            where: { idPost: post_id },
            include: {
                model: User,
                as: 'User',
                attributes: ['idUser', 'nickName', 'nombre', 'apellido']
            },
            order: [['createdAt', 'DESC']]
        })

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

        if (!idUser) {
            return res.status(400).json({ error: 'El idUser es obligatorio' })
        }

        if (!validarContenido_(contenido, res)) return

        const post = await buscarPostPorId_(post_id, res)
        if (!post) return

        const user = await User.findByPk(idUser)
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        const comment = await Comment.create({
            idPost: post_id,
            idUser,
            contenido
        })

        await actualizarFechaPost_(post_id)

        res.status(201).json(comment)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const putCommentByPost = async (req, res) => {
    try {
        const { post_id, comment_id } = req.params
        const { contenido } = req.body

        if (!validarContenido_(contenido, res)) return

        const post = await buscarPostPorId_(post_id, res)
        if (!post) return

        const comment = await buscarComentarioDelPost_(post_id, comment_id, res)
        if (!comment) return

        await comment.update({ contenido })

        await actualizarFechaPost_(post_id)

        res.status(200).json(comment)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const deleteCommentByPost = async (req, res) => {
    try {
        const { post_id, comment_id } = req.params

        const post = await buscarPostPorId_(post_id, res)
        if (!post) return

        const comment = await buscarComentarioDelPost_(post_id, comment_id, res)
        if (!comment) return

        await comment.destroy()

        await actualizarFechaPost_(post_id)

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
