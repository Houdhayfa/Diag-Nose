const router=require('express').Router()
const Atelier=require('../models/Atelier')
const {adminValidate}= require('../middlewares/authValidator')

// get  all Ateliers
//@path http://localhost:5000/atelier/all
// public

router.get('/all',async (req,res) => {
    allAteliers= await Atelier.find()
    try {
        res.status(200).send(allAteliers)
    } 
    catch (error) {
        res.status(500).send(error)
    }
})

// get  Atelier
//@path http://localhost:5000/atelier/:id
// public
router.get('/:id', async (req,res) => {
    const id=req.params.id
   
    const targetAtelier= await Atelier.findById(id)
     try {
         res.status(200).send({targetAtelier:targetAtelier})
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })



// add  Atelier
//@path http://localhost:5000/atelier/add
// private admin
router.post('/add', adminValidate, async (req,res) => {
    const user=req.user // moula token
   const {name,phone,email,address,latitude,longitude,isPartner}=req.body
   const newAtelier=new Atelier ({
       name:name,
       phone:phone,
       email:email,
       latitude:latitude,
       longitude:longitude,
       isPartner:isPartner,
       address:address,
   })
   
    try {
         await newAtelier.save()
        res.status(200).send({msg:"Atelier enregistré",
                              atelier:newAtelier})
    } 
    catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

// delete  Atelier
//@path http://localhost:5000/atelier/delete/:id
// private admin
router.delete('/delete/:id',adminValidate, async (req,res) => {
    const id=req.params.id
     try {
          const deletedAtelier =await Atelier.findOneAndDelete({_id:id})
         res.status(200).send({msg:"Atelier supprimé",
                               deletedAtelier:deletedAtelier})
     } 
     catch (error) {
         res.status(500).send(error)
         console.log(error)
     }
 })

// edit  Atelier
//@path http://localhost:5000/atelier/editAtelier/:id
// private admin
router.put('/editAtelier/:id', adminValidate, async (req,res) => {
    const id=req.params.id
    const {name,email,address,phone}=req.body
     try {
          const updatedAtelier =await Atelier.findOneAndUpdate({_id:id},{$set:{name,email,address,phone}})
         res.status(200).send({msg:"changements enregistrés",updatedAtelier:updatedAtelier})
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })

 // Make  Atelier partner
//@path http://localhost:5000/atelier/makePartner/:id
// private admin
router.put('/makePartner/:id', adminValidate, async (req,res) => {
    const id=req.params.id
     try {
          const updatedAtelier =await Atelier.findOneAndUpdate({_id:id},{$set:{isPartner:true}})
         res.status(200).send({msg:"Atelier marqué comme partenaire",updatedAtelier:updatedAtelier})
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })
  // UnMake  Atelier partner
//@path http://localhost:5000/atelier/unmakePartner/:id
// private admin
router.put('/unmakePartner/:id', adminValidate, async (req,res) => {
    const id=req.params.id
     try {
          const updatedAtelier =await Atelier.findOneAndUpdate({_id:id},{$set:{isPartner:false}})
         res.status(200).send({msg:"Partenaire supprimé",updatedAtelier:updatedAtelier})
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })

module.exports=router