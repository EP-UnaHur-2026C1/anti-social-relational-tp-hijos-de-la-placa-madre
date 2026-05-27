const {Router} = require('express')

const {getAllUsers, getUserById, getPostsByUserId, postUser, putUser, deleteUser} = require('../controllers/user.controller') //SCRUD

const { validateExistsModel} = require('../middlewares/genericMiddleware')// Middleware para validar que el recurso existe antes de ejecutar el controlador
const { validateSchema } = require('../middlewares/validateSchema')// Middleware para validar el cuerpo de la solicitud con un esquema de Joi

const { userSchema } = require('../schemas/user.schema')// Esquema de validación para la creación de un usuario

const { User } = require('../db/models') // Importamos el modelo de User para usarlo en el middleware de validación de existencia

const router = Router()

router.get('/usuarios', getAllUsers)
router.get('/usuario/:id', validateExistsModel(User), getUserById)
router.get('/usuario/:id/posts', validateExistsModel(User), getPostsByUserId)

router.post('/usuario', validateSchema(userSchema), postUser)

router.put('/usuario/:id', validateSchema(userSchema), validateExistsModel(User), putUser)

router.delete('/usuario/:id', validateExistsModel(User), deleteUser)

module.exports = router