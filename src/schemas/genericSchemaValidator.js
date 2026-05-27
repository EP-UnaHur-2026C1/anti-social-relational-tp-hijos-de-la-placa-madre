//este schema generico nos ayudara a validar los objetos.schemas en los middleware correspondientes

const genericSchemaValidator = (schema,data) =>{
    const {error,value} = schema.validate(data,{abortEarly:false})
    return{error,value}
}


module.exports = genericSchemaValidator
