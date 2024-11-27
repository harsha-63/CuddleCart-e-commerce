import User from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_TOKEN,{ expiresIn: '1h' })
}

//controller to registerUser
export const registerUser = async (req,res)=>{
  try{
      const {name,email,password} = req.body
  
    // Check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.json({success:false,message:'User already exists with this password'})
    }
      // Hash the password with salting
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
     // Create a new user & add to db
    const user = new User({name,email,password:hashedPassword});
    await user.save();
    // //create token for newuser
    // createToken(user._id)
    res.status(201).json({message:'User registered successfully! '})
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
}


// controller to loginUser
export const loginUser = async (req,res)=>{
    try{
      const {email,password} = req.body;
      const user = await User.findOne({email});
      if(!user){
        return res.status(401).json({success:false,message:"User is not found"})
      }
      if (user.isBlocked) {
        return res.json({ success: false, message: "Your account is blocked" });
      }
      const isMatch = await bcrypt.compare(password,user.password);
      //check the password is valid
      if(isMatch){
        const token =createToken(user._id)
        res.json({success:true,token:token})
      }
      else{
        res.json({success:false,message:"Invalid credentials"})
      }
    }
    catch(error){
      console.log(error);
      res.json({success:false,message:error.message})
      
    }

}


//controller for admin login
export const adminLogin = async(req,res)=>{
  try{
    const {email,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({isAdmin:true} , process.env.JWT_TOKEN,{expiresIn:"1D"})
        res.json({success:true,token:token})
    }
    else{
      res.json({success:false,message:"Invalid Credentials"})
    }
  }
  catch(error){
    console.log(error);
      res.json({success:false,message:error.message})
      
  }

}