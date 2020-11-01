const mongoose=require('mongoose')
const schema=mongoose.Schema
const demandeSchema= new schema({
    user:{type:mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true},
    atelier:{type:mongoose.Schema.Types.ObjectId,
          ref:'Atelier'},
    marque:{type:String,
            required:true},
    description:{type:String,
                 require:true},
    date:{type:Date,
          default:Date.now()}
    
})

module.exports=mongoose.model("demande",demandeSchema)