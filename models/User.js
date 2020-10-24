const mongoose=require('mongoose')
const schema=mongoose.Schema
const UserSchema=new schema({
    name:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true,
        unique:true},
    phone:{
        type:Number,
        required:true},
    password:{
        type:String,
        required:true},
    isBlocked:{
        type:Boolean,
        default:false},
    isAdmin:{
        type:Boolean,
        default:false},
            

})

module.exports=mongoose.model("User",UserSchema)