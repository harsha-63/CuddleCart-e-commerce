import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/mongodb.js'
import connectCloudinary from './Config/cloudinary.js'
import userRouter from './Routes/userRoute.js'
import productRouter from './Routes/productRoute.js'

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
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.get('/',(req,res)=>{
    res.send('Api Working')
})

app.listen(port,()=>{
    console.log("Server is running on PORT:" + port)
    
})

