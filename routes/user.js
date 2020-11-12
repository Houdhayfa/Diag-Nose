const router=require('express').Router()
const Joi=require('joi')
const User=require('../models/User')
const UserProfile=require('../models/UserProfile')
const Demande=require('../models/Demande')
const Reservation=require('../models/Reservation')
const Atelier=require('../models/Atelier')

const {authValidate}= require('../middlewares/authValidator')



// get all users
//@path http://localhost:5000/user/all
// private
router.get('/all', async (req,res) => {
   
    try {
        let allUsers= await User.find()
        res.status(200).send({msg:"tous les utilisateurs trouvés",All_Users:allUsers})
    } 
    catch (error) {
        res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
        console.log(error)
    }
})


// get user
// http://localhost:5000/user/:id
// private

router.get('/:_id',authValidate, async (req,res) => {
   const id=req.params._id
    try {
        let targetUser= await User.findOne({_id:id})
        res.status(200).send({msg:"utilisateur trouvé",
                              targetUser:targetUser})
    } 
    catch (error) {
        res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
        console.log(error)
    }
})


// edit user
// http://localhost:5000/user/editUser/:id
// private
router.put('/editUser/:_id',authValidate, async (req,res) => {
    const id=req.params._id
    const {name,email,phone}=req.body
     try {
         let updatedtUser= await User.findOneAndUpdate({_id:id},{$set:{name,email,phone}})
         res.status(200).send({msg:"changements enregistrés",
                              updatedtUser:updatedtUser})
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })

 // get user demandes
// http://localhost:5000/user/demande_all/:id
// private
router.get('/demande_all/:id',authValidate, async (req,res) => {
    
     try {
        const user=req.params.id
         let demande_all= await Demande.find({user})
        
        res.status(200).send({msg:"demandes trouvées",demandes:demande_all})
     } 
     catch (error) {
         res.status(500).send(error)
         console.log(error)
     }
 })
 // get user reservations
// http://localhost:5000/user/reservation_all/:id
// private
router.get('/reservation_all/:id', async (req,res) => {
    const user=req.params.id
     try {
         let reservation_all= await Reservation.find({user})
         res.status(200).send({msg:"reservations trouvées",reservations:reservation_all})
         console/log(reservation_all)
     } 
     catch (error) {
         res.status(500).send(error)
         console.log(error)
     }
 })




module.exports=router