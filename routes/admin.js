const router=require('express').Router()
const Joi=require('joi')
const User=require('../models/User')
const UserProfile=require('../models/UserProfile')
const {adminValidate}=require('../middlewares/authValidator')

/*  ##################################### User ########################################## */

// get all users
//@path http://localhost:5000/admin/allUsers
// private
router.get('/allUsers', async (req,res) => {
   
    try {
        let allUsers= await User.find()
        res.status(200).send(allUsers)
    } 
    catch (error) {
        res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
        console.log(error)
    }
})



// bloc user
// http://localhost:5000/admin/block/:id
// private
router.put('/block/:_id',adminValidate, async (req,res) => {
    const id=req.params._id
     try {
         let blockedtUser= await User.findOneAndUpdate({_id:id},{$set:{isBlocked:true}})
         res.status(200).send(blockedtUser)
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })

 // unblock user
// http://localhost:5000/admin/unblock/:id
// private
router.put('/unblock/:_id',adminValidate, async (req,res) => {
    const id=req.params._id
     try {
         let blockedtUser= await User.findOneAndUpdate({_id:id},{$set:{isBlocked:false}})
         res.status(200).send(blockedtUser)
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })
/*  ##################################### admin ########################################## */

// upgrade user to admin
//@path http://localhost:5000/admin/addAdmin
//private
router.put('/addAdmin/:_id',adminValidate, async (req,res) => {
    const id=req.params._id
     try {
         let upgradedtUser= await User.findOneAndUpdate({_id:id},{$set:{isAdmin:true}})
         res.status(200).send(upgradedtUser)
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })








module.exports=router