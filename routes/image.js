const router=require('express').Router()
const dotenv=require('dotenv')
const {imageValidator}=require('../middlewares/uploadValidator')
const {bufferTo64Converter}=require('../middlewares/bufferTo64Converter')
const Image=require('../models/Image')

/* cloudinary */
const cloudinary=require('cloudinary').v2
 cloudinary.config({
     cloud_name:process.env.CLOUDINAY_NAME,
     api_key:process.env.CLOUDINAY_API_KEY,
     api_secret:process.env.CLOUDINAY_API_SECRET
 })
const cloudinaryUpload= file =>cloudinary.uploader.upload(file)
/* Routes */

//upload image
//@path http://localhost:5000/image/upload
// private user
router.post('/upload',imageValidator,async (req,res) => {
    try {
        if(!req.file) return res.send('file not received')
        const image=req.file
        const image64=bufferTo64Converter(image)
        const uploadResult =await cloudinaryUpload(image64.content)
        const uploadedImage=new Image({
            cloudinaryId:uploadResult.public_id,
            url:uploadResult.secure_url
        })
        const savedImage=await uploadedImage.save()
        res.send(savedImage)
        
    } 
    catch (error) {
        console.log(error)
    }
})






module.exports=router
