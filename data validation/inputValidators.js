const Joi=require('joi')


const registerValid= (data) => {
      
    const regSchema=Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().min(5).required().email(),
        phone:Joi.number().required(),
        password:Joi.string().min(8).required()
    })
    const validation= regSchema.validate(data)
    return validation
}

const loginValid= (data) => {
      
    const loginSchema=Joi.object({
        email:Joi.string().min(5).required().email(),
        password:Joi.string().min(8).required()
    })
    const validation= loginSchema.validate(data)
    return validation
}
module.exports={registerValid,loginValid}