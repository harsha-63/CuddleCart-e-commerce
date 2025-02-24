import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/mongodb.js'
import {connectCloudinary} from './Config/cloudinary.js'
import errorHandler from './Middlewares/errorHandler.js'
import cookieParser from "cookie-parser";
import authRouter from './Routes/authRoute.js'
import router from './Routes/userRoute.js'
import admin from './Routes/adminRoute.js' 

dotenv.config()

//App config
const app = express()
const port = process.env.PORT || 3002
connectDB()
connectCloudinary()


//Middleware config
app.use(express.json())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }))

app.use(cookieParser());
//api endpoints
app.use('/auth',authRouter)
app.use('/user',router)
app.use('/admin',admin)
app.get('/',(req,res)=>{
    res.send('Api Working')
})

//error handler middleware
app.use(errorHandler)


app.listen(port,()=>{
    console.log("Server is running on PORT:" + port)
    
})

