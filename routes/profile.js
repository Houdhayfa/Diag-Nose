const router=require('express').Router()
const Joi=require('joi')
const User=require('../models/User')
const UserProfile=require('../models/UserProfile')
const {profileValidate,adminValidate}=require('../middlewares/authValidator')

// get all profiles
//@path http://localhost:5000/profile/all
// private admin
router.get('/all',adminValidate, async (req,res) => {
   
    try {
        let allProfiles= await UserProfile.find()
        res.status(200).send(allProfiles)
    } 
    catch (error) {
        res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
        console.log(error)
    }
})

// get profile
// http://localhost:5000/profile/:id
// private

router.get('/:_id',profileValidate, async (req,res) => {
    const id=req.params._id
     try {
         let targetProfile= await UserProfile.findOne({_id:id})
         res.status(200).send(targetProfile)
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })

// edit profile
// http://localhost:5000/profile/editProfile/:id
// private
    router.put('/editProfile/:id',profileValidate, async (req,res) => {
    const id=req.params._id
    const {name,email,phone}=req.body
    const targetProfile=await UserProfile.findById(id)
    const targetUser=await User.findById(targetProfile.user)
     try {
         let updatedUser= await User.findOneAndUpdate({_id:targetUser._id},{$set:{name,email,phone}})
         res.status(200).send({updatedUser:updatedUser,
                               profile:targetProfile })
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })






 module.exports=router