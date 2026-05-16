const {User} = require('../db/models');

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

module.exports = {getAllUsers, getUserById, postUser, putUser, deleteUser}