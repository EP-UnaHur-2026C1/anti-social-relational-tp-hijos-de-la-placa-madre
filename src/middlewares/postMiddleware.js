const {Post} = require('../db/models')
const {validarById} = require('./genericMiddleware')
const postSchema = require('../schemas/postSchema')
const genericSchemaValidator = require('../schemas/genericSchemaValidator')


const validarPostById = validarById(Post, 'postId')

const validarSchemaPost = (req,res,next) =>{
    const {error,_} =  genericSchemaValidator(postSchema,req.body)
    if(error){

        res.status(400).json({error : error.details.map((e) =>{
                return {
                    attributos: e.path[0],
                    detalle : e.message,
                }
            })
        }) 
        return 
    }
    
    next()
}

module.exports ={validarPostById}