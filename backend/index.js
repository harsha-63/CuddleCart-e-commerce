import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/mongodb.js'
import connectCloudinary from './Config/cloudinary.js'
import errorHandler from './Middlewares/errorHandler.js'
import authRouter from './Routes/authRoute.js'
import router from './Routes/userRoute.js'

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
app.use('/api/user',router)
app.get('/',(req,res)=>{
    res.send('Api Working')
})

//error handler middleware
app.use(errorHandler)


app.listen(port,()=>{
    console.log("Server is running on PORT:" + port)
    
})

