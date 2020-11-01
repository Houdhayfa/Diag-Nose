const express=require('express')
const cors=require('cors')
const connectDB=require('./config/connectDB')
const app=express()
const port=process.env.PORT||5000
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const adminRouter=require('./routes/admin')
const demandeRouter=require('./routes/demande')
const atelierRouter=require('./routes/atelier')
const reservationRouter=require('./routes/reservation')
const imageRouter=require('./routes/image')

//middlewares
app.use(express.json())
app.use(cors())


//routes

app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/profile',profileRouter)
app.use('/admin',adminRouter)
app.use('/demande',demandeRouter)
app.use('/atelier',atelierRouter)
app.use('/reservation',reservationRouter)
app.use('/image',imageRouter)
app.use('/image',imageRouter)






//run mongodb server
connectDB()
//run server
app.listen(port, (err) =>{
    if (err) return console.log(`CONNECTION TO SERVER ON PORT ${port} FAILED...`)
       console.log(`CONNECTED SUCCESSFULLY TO SERVER ON PORT ${port}...`)
})