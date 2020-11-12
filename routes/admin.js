const router=require('express').Router()
const Joi=require('joi')
const User=require('../models/User')
const Demande=require('../models/Demande')
const {adminValidate}=require('../middlewares/authValidator')

/*  ##################################### User operations ########################################## */

// get all users
//@path http://localhost:5000/admin/allUsers
// private
router.get('/allUsers',adminValidate, async (req,res) => {
   
    try {
        let allUsers= await User.find()
        res.status(200).send({msg:"tous les utilisateurs trouvés",All_Users:allUsers})
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
         res.status(200).send({msg:"utilisateur bloqué",
                               blockedtUser:blockedtUser})
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })

// unblock user
// http://localhost:5000/admin/unblock/:id
// private admin
router.put('/unblock/:_id',adminValidate, async (req,res) => {
    const id=req.params._id
     try {
         let unblockedtUser= await User.findOneAndUpdate({_id:id},{$set:{isBlocked:false}})
         res.status(200).send({msg:"compte réactivé",
                               unblockedtUser:unblockedtUser})
     } 
     catch (error) {
         res.status(500).send('SERVER FAILED TO FULLFILL REQUEST...')
         console.log(error)
     }
 })
/*  ##################################### admin operations ########################################## */

// upgrade user to admin
//@path http://localhost:5000/admin/addAdmin
//private admin
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