const router=require('express').Router()
const Demande=require('../models/Demande')
const {authValidate,adminValidate}= require('../middlewares/authValidator')

// get  all demandes
//@path http://localhost:5000/demande/all
// private admin
router.get('/all', adminValidate, async (req,res) => {
    const allDemandes= await Demande.find()
     try {
         res.status(200).send(allDemandes)
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })


// get  demande
//@path http://localhost:5000/demande/:id
// private user
router.get('/:id', authValidate, async (req,res) => {
    const id=req.params.id
   
    const targetDemande= await Demande.findById(id)
     try {
         res.status(200).send(targetDemande)
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })



// add  demande
//@path http://localhost:5000/demande/add/:atelierId
// private user
router.post('/add/:atelierId', authValidate, async (req,res) => {
   const atelierId=req.params.atelierId
   const user=req.user // moula token
   const {marque,description}=req.body
   const newDemande=new Demande ({
    user:user._id,
    atelier:atelierId,
    marque:marque,
    description:description
    })
    try {
         await newDemande.save()
        res.status(200).send({msg:"Demande enregistrée",user:user.name,demande:newDemande})
    } 
    catch (error) {
        res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
        console.log(error)
    }
})

// delete  demande
//@path http://localhost:5000/demande/delete/:id
// private user
router.delete('/delete/:id', authValidate, async (req,res) => {
    const id=req.params.id
     try {
          const deletedDemande =await Demande.findByIdAndDelete(id)
          if(!deletedDemande) throw ('demande non trouvée')
         res.status(200).send({msg:"demande supprimée",
                               deletedDemande:deletedDemande})
     } 
     catch (error) {
         res.status(500).send(error)
         console.log(error)
     }
 })

 // edit  demande
//@path http://localhost:5000/demande/editDemande/:id
// private user
router.put('/editDemande/:id', authValidate, async (req,res) => {
    const id=req.params.id
    const {marque,description}=req.body
    date=Date.now()
     try {
          const updatedDemande =await Demande.findOneAndUpdate({_id:id},{$set:{marque,description,date}})
         res.status(200).send({msg:"changements enregistrés",
                               updatedDemande:updatedDemande})
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })

module.exports=router