const {Tag,Post} = require('../db/models')
const tag = require('../db/models/tag')

//Obtener todos los Tags

const findAllTags = async(req,res) =>{
    try{
    
        const data = await Tag.findAll()
    
        res.status(200).json(data)
    
    }catch(error){
        console.error(error)
        res.status(404).json({error : "error del Servidor"})
    }
} 


//Obtener Tag con un id definido

const findTagByPk = async(req,res) =>{
    try{
        const id = req.id
        const data = await Tag.findByPK(id)
    
        if(!data){
            console.log(`el id ${id} no se a encontrado`)
        }
    
        res.status(200).json(data)
    
    }catch(error){
        console.error(error)
        res.status(404).json({error : "error del Servidor"})
    }
}

//Crear nuevo Tag

const postTag = async(req,res)=>{
    try{
        const data = req.body
        const tag = await Tag.create(data)
    
        res.status(201).json(tag)
    
    }catch(error){
        console.error(error)
        res.status(500).json({error : "error del Servidor"})
    }
}

//Actualizar Tag con id definido

const putTag = async(req,res)=>{
    try{
        const id = req.params.id
        const tag = await Tag.findByPK(id)
    
        const newData = req.body
    
        await tag.update(newData)

        res.status(201).json(tag)
    }catch(error){
        console.error(error)
        res.status(500).json({error : "Error del Servidor"})
    }
}

//Eliminar Tag con id definido

const deleteTag = async(req,res) =>{
    try{
        const id = req.params.id
        const tag = await Tag.findByPK(id)
        
        await tag.destroy()
        
        res.status(200).json({message: 'Usuario eliminado de la base de datos'})

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

// Post_Tag

const aassignTagToPost = async(req,res)=>{
    try{
        const id = req.params.id
        const data = req.body
        const post = await Post.findByPk(id)

        const promesas = []
        data.tags.forEach(async(tag) => {
            promesas.push(tag.idTag)
        });

        listaTag = await Promise.all(promesas)
        
        post.addTags(listaTag)

        res.status(200).json({...post.dataValues,
            tags: await post.getTags({joinTableAttributes:[]})
        })
    }catch(error){
        console.error(error)
        res.statuc(404).json({error : "error de servidor"})
    }
}


module.exports ={findAllTags,findTagByPk,postTag,putTag,deleteTag,aassignTagToPost} 