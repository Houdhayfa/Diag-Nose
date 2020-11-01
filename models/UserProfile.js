const { string } = require('joi')
const mongoose=require('mongoose')
const schema=mongoose.Schema
const profileSchema=new schema({
   user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
   imageUrl:{type:String}
})

module.exports=mongoose.model("Profile",profileSchema)