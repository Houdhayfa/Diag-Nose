const router=require('express').Router()
const User=require('../models/User')
const UserProfile=require('../models/UserProfile')
const {registerValid,loginValid}=require('../middlewares/inputValidators')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const {authValidate}=require('../middlewares/authValidator')



// register
//@path http://localhost:5000/auth/register
// public

router.post('/register', async (req,res) => {
    const regValidation=registerValid(req.body)
    const {name,email,password,phone}=req.body
    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)
    const newUser=new User({
        name:name,
        email:email,
        password:hashedPassword,
        phone:phone
    })
    const newProfile=new UserProfile({
        user:newUser._id
    })
    try {
        let exists= await User.findOne({email})
        if (exists) throw ('Email already used')
        if (regValidation.error) throw (regValidation.error.details[0].message)
        await newUser.save()
        await newProfile.save()
        res.status(200).send(
            {msg:"Compte ajouté",
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                phone:newUser.phone,
                isAdmin:newUser.isAdmin,
                isBlocked:newUser.isBlocked
            }
        })
    } 
    catch (error) {
        res.status(400).send(error)
        console.log(`ERROR 400: ${error}`)
    }
})

// login
//@path http://localhost:5000/auth/login
// public

router.post('/login', async (req,res) => {
    const logValidation=loginValid(req.body)
    const {email,password}=req.body
    try {
        //input valid
        if (logValidation.error) throw (logValidation.error.details[0].message)
        //check mail
        const user= await User.findOne({email})
        if (!user) throw ("mot de passe ou email n'est pas correct")
        //check password
        let safePass= await bcrypt.compare(password,user.password)
        if (!safePass) throw("mot de passe ou email n'est pas correct")
        //check suspension
        let isBlocked= user.isBlocked
        if (isBlocked) throw('Votre compte a été suspendu')
        // token
        const payload={
            _id:user._id,
            isAdmin:user.isAdmin
        }
        const token=jwt.sign(payload,process.env.JWT_PASS)
        console.log(token)
        res.status(200).send({msg:"Vous êtes connecté",user,token})
    } 
    catch (error) {
        res.status(400).send(error)
        console.log(`ERROR 400: ${error}`)
    }
})

// test private route
// @path http://localhost:5000/auth/getAuth
router.get('/getAuth',authValidate , async (req,res) =>{
    const {name,email,phone,_id,isAdmin,isBlocked}=req.user
res.send({
    user:{
        name,email,phone,_id,isAdmin,isBlocked
    },
    msg:"Vous êtes connecté"
})
})


module.exports=router