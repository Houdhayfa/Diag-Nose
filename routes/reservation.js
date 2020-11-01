const router=require('express').Router()
const Reservation=require('../models/Reservation')
const {authValidate,adminValidate}= require('../middlewares/authValidator')
const Demande = require('../models/Demande')
const Atelier = require('../models/Atelier')

// get  all reservations
//@path http://localhost:5000/reservation/all
// private admin
router.get('/all', adminValidate, async (req,res) => {
    const allReservations= await Reservation.find()
     try {
         res.status(200).send(allReservations)
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })


// get  reservation
//@path http://localhost:5000/reservation/:id
// private user
router.get('/:id', authValidate, async (req,res) => {
    const id=req.params.id
   
    const targetreservation= await Reservation.findById(id)
     try {
         res.status(200).send(targetreservation)
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })



// add  reservation
//@path http://localhost:5000/reservation/add/:demandeId
// private admin
router.post('/add/:demandeId', adminValidate, async (req,res) => {
   const demandeId=req.params.demandeId
   const adminId=req.user._id // admin token
   const targetDemande=await Demande.findById(demandeId)
   const userId=targetDemande.user
   const {rendezVous}=req.body
   const atelierId=targetDemande.atelier
   const newReservation=new Reservation ({
    user:userId,
    admin:adminId,
    atelier:atelierId,
    rendezVous:rendezVous
    })
    try {
        if(!targetDemande) throw ('Demande non trouvée')
         await newReservation.save()
        res.status(200).send({msg:"Reservation enregistrée",
                              reservation:newReservation})
    } 
    catch (error) {
        res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
        console.log(error)
    }
})

// delete  reservation
//@path http://localhost:5000/reservation/delete/:id
// private admin
router.delete('/delete/:id', adminValidate, async (req,res) => {
    const id=req.params.id
     try {
          const deletedReservation =await Reservation.findByIdAndDelete(id)
          if(!deletedReservation) throw ('Reservation non trouvée')
         res.status(200).send({msg:"reservation supprimée",
                               deletedReservation:deletedReservation})
     } 
     catch (error) {
         res.status(500).send(error)
         console.log(error)
     }
 })

 // edit  reservation
//@path http://localhost:5000/reservation/editReservation/:id
// private admin
router.put('/editReservation/:id', adminValidate, async (req,res) => {
    const id=req.params.id
    const {rendezVous}=req.body
     try {
          const updatedReservation =await Reservation.findOneAndUpdate({_id:id},{$set:{rendezVous}})
         res.status(200).send({msg:"changements enregistrés",
                               updatedReservation:updatedReservation})
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })

 // conclude  reservation
//@path http://localhost:5000/reservation/conclude/:id
// private admin
router.put('/conclude/:id', adminValidate, async (req,res) => {
    const id=req.params.id
     try {
          const updatedReservation =await Reservation.findOneAndUpdate({_id:id},{$set:{isConcluded:true}})
         res.status(200).send({msg:"Reservation clôturée",
                            ConcludedReservation:updatedReservation})
     } 
     catch (error) {
         res.status(500).send('ERROR:SERVER FAILED TO FULLFILL YOUR REQUEST...')
         console.log(error)
     }
 })

module.exports=router