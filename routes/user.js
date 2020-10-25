const router=require('express').Router()
const Joi=require('joi')
const User=require('../models/User')
const UserProfile=require('../models/UserProfile')
const {authValidate}= require('../middlewares/authValidator')



// get all users
//@path http://localhost:5000/user/all
// private
router.get('/all', async (req,res) => {
   
    try {
        let allUsers= await User.find()
        res.status(200).send(allUsers)
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
        res.status(200).send(targetUser)
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
         res.status(200).send(updatedtUser)
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })




module.exports=router