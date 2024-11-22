import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/mongodb.js'
import connectCloudinary from './Config/cloudinary.js'
import authRouter from './Routes/authRoute.js'
import productRouter from './Routes/userRoute.js'

dotenv.config()

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


//Middleware config
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/auth',authRouter)
app.use('/api/user',productRouter)
app.get('/',(req,res)=>{
    res.send('Api Working')
})

app.listen(port,()=>{
    console.log("Server is running on PORT:" + port)
    
})

