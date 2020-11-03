const mongoose=require('mongoose')
const schema=mongoose.Schema
const atelierSchema=new schema({
    name:{
        type:String,
        required:true},
    phone:{
        type:Number,
        required:true},
    address:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true
    },
    latitude:{
        type:Number},
    longitude:{
        type:Number},
    isPartner:{
        type:Boolean,
        default:false,
        required:true}
            

})

module.exports=mongoose.model("Atelier",atelierSchema)