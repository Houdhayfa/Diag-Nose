const multer=require('multer')
const storage=multer.memoryStorage()
const upload=multer({
    storage,
    fileFilter: function(req,file,cb){
     let imageFormats=['image/jpg','image/jpeg','image/png']
     if(imageFormats.includes(file.mimetype)){cb(null,true)}
     else{cb(new Error('File extension not supported'),false)}
    }
})
const singleUpload=upload.single('image')
const imageValidator = (req,res,next) =>{
    singleUpload(req,res, (error) => {
        if(error) return res.status(422).send({msg:'Image upload Failed...'})
        next()
    })
}
module.exports={imageValidator}