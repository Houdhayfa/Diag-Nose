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
    lat:{
        type:Number},
    lng:{
        type:Number},
    isPartner:{
        type:Boolean,
        default:false}
            

})

module.exports=mongoose.model("Atelier",atelierSchema)