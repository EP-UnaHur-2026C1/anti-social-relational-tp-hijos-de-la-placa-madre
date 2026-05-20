const { User, Post, PostImage, Tag, Comment} = require('../db/models');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const getPostsByUserId = async (req, res) => {
    try {
        const id = req.params.id; 

        const user = await User.findByPk(id, {
            include: {
                model: Post,
                as: 'posts', 
            
                include: [
                    {
                        model: PostImage,
                        as: 'Images' // Trae las imágenes del post
                    },
                    {
                        model: Tag,
                        as: 'Tags', // Trae los tags del post
                        through: { attributes: [] } // Tip pro: limpia la tabla intermedia para que no tire basura
                    },
                    {
                        model: Comment,
                        as: 'Comments' // Trae los comentarios del post
                    }
                ]
            }
        });

        // Devolvemos los posts con todo su contenido adentro
        return res.status(200).json(user.posts);
        
    } catch (error) {
        console.error("Error exacto en la consulta:", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const postUser = async (req, res) => {
    try {
        const newUser = req.body
        const user = await User.create(newUser)
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const putUser = async (req, res) => {
    try {
        const id = req.params.id
        const userActualizado = req.body

        const user = await User.findByPk(id)

        await user.update(userActualizado)

        res.status(201).json(user)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)

        await user.destroy()

        res.status(200).json({message: 'Usuario eliminado de la base de datos'})

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

module.exports = {getAllUsers, getUserById, getPostsByUserId, postUser, putUser, deleteUser}