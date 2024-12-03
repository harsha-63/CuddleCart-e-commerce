import User from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { joiUserSchema } from "../Models/validation.js";


const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_TOKEN,{ expiresIn: '1h' })
}
const createRefreshToken = (id) =>{
  return jwt.sign({id},process.env.JWT_REFRESH_TOKEN,{ expiresIn: '1D' })
}

//controller to registerUser
export const registerUser = async (req,res)=>{
  try{
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
      const {name,email,password} = req.body
  
    // Check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.json({success:false,message:'User already exists'})
    }
      // Hash the password with salting
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = new User({name,email,password:hashedPassword});
    await user.save();
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
      if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
        
      }
      const token =createToken(user._id)
      const refreshToken = createRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {httpOnly: true,secure: false,sameSite: "none"});
      res.json({ success:true, message: "Logged in successfully", token:token });
    
    
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
        const token = jwt.sign({isAdmin:true} , process.env.JWT_TOKEN,{expiresIn:"1h"})
        const refreshToken = jwt.sign({isAdmin:true} , process.env.JWT_REFRESH_TOKEN,{expiresIn:"1D"})
      
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
        });
        return res.json({ success:true, message: "Logged in successfully", token:token });
      }
   return res.json({success:false,message:"Invalid Credentials"}) 
  }
  catch(error){
    console.log(error);
      res.json({success:false,message:error.message})
      
  }

}

export const refreshingToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    next(new CustomError("No refresh token found", 401));
  }
  // Verifying the refresh token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
  const user = await User.findById(decoded.id);
  if (!user) {
    next(new CustomError("User not found", 401));
  }
  const accessToken = createAccessToken(user._id, user.role, "1h");
  res.status(200).json({ message: "Token refreshed", token: accessToken });
};

// Controller to handle logout
export const logout = async (req, res,next) => {
  // Clearing the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  res.status(200).json({ status: "success", message: "Logged out successfully" });
};