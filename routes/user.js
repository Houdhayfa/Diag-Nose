const router=require('express').Router()
const Joi=require('joi')
const User=require('../models/User')
const UserProfile=require('../models/UserProfile')

// add user
//@path http://localhost:5000/user/addUser
router.post('/addUser', async (req,res) => {
    const {name,email,password,phone}=req.body
    const newUser=new User({
        name,
        email,
        password,
        phone
    })
    const newProfile=new UserProfile({
        user:newUser._id
    })
    try {
        await newUser.save()
        await newProfile.save()
        res.send(newUser)
    } 
    catch (error) {
        res.status(400).send(`ERROR USER WAS NOT SAVED CAUSE:`)
        console.log(error)
    }
})

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
module.exports=router

// get user
// http://localhost:5000/user/:id
// public

router.get('/:_id', async (req,res) => {
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
// bloc user
// http://localhost:5000/user/block/:id
// private
router.put('/block/:_id', async (req,res) => {
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
// http://localhost:5000/user/unblock/:id
// private
router.put('/unblock/:_id', async (req,res) => {
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

 // edit user
// http://localhost:5000/user/editUser/:id
// private
router.put('/editUser/:_id', async (req,res) => {
    const id=req.params._id
    const {name,email,phone}=req.body
    let updatedUser={name,email,phone}
     try {
         let blockedtUser= await User.findOneAndUpdate({_id:id},{$set:{name,email,phone}})
         res.status(200).send(blockedtUser)
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })




module.exports=router