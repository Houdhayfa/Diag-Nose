const express=require('express')
const cors=require('cors')
const connectDB=require('./config/connectDB')
const app=express()
const port=process.env.PORT||5000
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const adminRouter=require('./routes/admin')


//middlewares
app.use(express.json())
app.use(cors())


//routes

app.use('/api/user',userRouter)
app.use('/auth',authRouter)
app.use('/profile',profileRouter)
app.use('/admin',adminRouter)





//run mongodb server
connectDB()
//run server
app.listen(port, (err) =>{
    if (err) return console.log(`CONNECTION TO SERVER ON PORT ${port} FAILED...`)
       console.log(`CONNECTED SUCCESSFULLY TO SERVER ON PORT ${port}...`)
})