


/*############################## à inclure dans UserProfile ,changer ou supprimer ################# */



const mongoose=require('mongoose')
const schema=mongoose.Schema
const imageSchema=new schema({
    cloudinaryId:{type:String,
                  required:true},
    url:{type:String,
        required:true}
})

module.exports=mongoose.model('Image',imageSchema)