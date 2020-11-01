const mongoose=require('mongoose')
const schema=mongoose.Schema
const reservationSchema= new schema({
    user:{type:mongoose.Schema.Types.ObjectId,
          ref:'User',
        required:true},
    admin:{type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true},
    atelier:{type:mongoose.Schema.Types.ObjectId,
        ref:'Atelier',
        required:true},
    rendezVous:{type:String,
          required:true},
    date:{type:Date,
          default:Date.now()},
    isConcluded:{type:Boolean,
          default:false
    }
    
})

module.exports=mongoose.model("Reservation",reservationSchema)