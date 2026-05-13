const {Router} = require('express')
const {getAllUsers, getUserById, postUser, putUser, deleteUser} = require('../controllers/user.controller')
const router = Router()

router.get('/usuarios', getAllUsers)
router.get('/usuario/:id', getUserById)

router.post('/usuario', postUser)

router.put('/usuario', putUser)

router.delete('/usuario', deleteUser)

module.exports = router