const jwt=require('jsonwebtoken')
const User=require('../models/User')
const UserProfile=require('../models/UserProfile')

const authValidate = async (req,res,next) =>{

try {
    const token=req.headers["x-auth-token"]
    if(!token) throw('Non Authorisé')
    const decoded= await jwt.verify(token,process.env.JWT_PASS)
    const user = await User.findById(decoded._id)
    if(!user) throw('Non Authorisé')
    let isBlocked= user.isBlocked
        if (isBlocked) throw('Votre compte a été suspendu')
    req.user=user
    
    next()
} 
catch (error) {
    res.status(401).send(error)
    console.log(error)  
}
}
const adminValidate = async (req,res,next) =>{

    try {
        const token=req.headers["x-auth-token"]
        if(!token) throw('Non Authorisé')
        const decoded= await jwt.verify(token,process.env.JWT_PASS)
        const user = await User.findById(decoded._id)
        if(!user) throw('Non Authorisé')
        if(!user.isAdmin) throw('Non Authorisé')
        req.user=user
        
        next()
    } 
    catch (error) {
        res.status(401).send('Non Authorisé')
        console.log(error)  
    }
    }
    const profileValidate = async (req,res,next) =>{

        try {
            const token=req.headers["x-auth-token"]
            if(!token) throw('Non Authorisé')
            //token data
            const decoded= await jwt.verify(token,process.env.JWT_PASS)
            const tokenProfile = await UserProfile.findOne({user:decoded._id})
            console.log(`token profile id ${tokenProfile._id}`)
            const tokenUser= await User.findById(decoded._id)
            if(!tokenProfile) throw('Profile non trouvé')
            //required data
            const demandedProfileId=req.params._id
            const demandedProfile= await UserProfile.findById(demandedProfileId)
            const demandedUser=await User.findById(demandedProfile.user)
            console.log(`demandedProfileId ${demandedProfileId}`)
            // verifier suspension
            let isBlocked= demandedUser.isBlocked
            if (isBlocked) throw('Le compte a été suspendu') 
            //verifier si le porteur du token est le propriétaire du profile demandé
            if(tokenProfile._id != demandedProfileId && !tokenUser.isAdmin ) throw('Non Authorisé')// l'admin peut voir tous les profiles
            req.user=demandedProfile
            res.status(200).send({profile:demandedProfile,
                                  user:demandedUser
            })
            next()
        } 
        catch (error) {
            res.status(401).send(error)
            console.log(error)  
        }
        }
module.exports={authValidate,adminValidate,profileValidate}