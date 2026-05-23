const {Router} = require("express")
const {findAllTags,findTagByPk,postTag,putTag,deleteTag,aassignTagToPost} = require("../controllers/tag.controllers")
const router = Router() 

//Obtener todos los tags

router.get('/tags',findAllTags)

//Obtener un Tag con id definido

router.get('/tag/:id',findTagByPk)

//Crear un nuevo Tag

router.post('/tag',postTag)

//Actualizar un Tag con id definido

router.put('/tag/:id',putTag)

//Eliminar un Tag con id definido

router.delete('/tag/:id',deleteTag)

// Asignar tags a un post con id definido

router.post('/tag/post/:id',aassignTagToPost)

module.exports = router