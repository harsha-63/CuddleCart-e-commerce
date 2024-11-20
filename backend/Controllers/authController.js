import userModel from "../Models/userModel"
import bcrypt from bcrypt



export const registerUser = async (req,res)=>{
    const {name,email,password} = req.body
    try{
    // Check if user already exists
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        res.status(404).json({message:'User already exists with this password'})
    }
      // Hash the password with salting
    const hashedPassword = await bcrypt.hash(password,10)
     // Create a new user
    const user = new userModel({name,email,password:hashedPassword})
    res.status(201).json({message:'User registered successfully! '})
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
}

export const loginUser = async (req,res)=>{
    const {email,password} = req.body

}