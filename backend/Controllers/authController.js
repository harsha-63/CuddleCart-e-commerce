import User from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { joiUserSchema } from "../Models/validation.js";
import CustomError from "../Utils/customError.js";


const createToken = (id,isAdmin) =>{
  return jwt.sign({id,isAdmin},process.env.JWT_TOKEN,{ expiresIn: '1s' })
}
const createRefreshToken = (id,isAdmin) =>{
  return jwt.sign({id,isAdmin},process.env.JWT_REFRESH_TOKEN,{ expiresIn: '1D' })
}

//controller to registerUser

export const registerUser = async (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new CustomError("User already exists", 409));
  }

 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

 
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "User registered successfully!" });
};



// controller to loginUser
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User not found", 401));
  }
  if (user.isBlock) {
    return next(new CustomError("Your account is blocked", 403));
  }

  // Validate the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }
  const token = createToken(user._id,user.isAdmin);
  const refreshToken = createRefreshToken(user._id,user.isAdmin);

  user.refreshToken = refreshToken;
  await user.save();

  // Set refresh token in cookies
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  const currentUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }
  //sending user details to client (for curr user)

  res.json({ success: true, message: "Logged in successfully", token,currentUser });
};



export const adminLogin = async(req,res,next)=>{
  const {email,password} = req.body
  const user = await User.findOne({email});
      if(!user){
        return res.status(401).json({success:false,message:"User is not found"})
      }
      if (!user.isAdmin) {
        return next(new CustomError("You are not authorized", 403))
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return next(new CustomError("Invalid Credentials",401))
      }
      const token = createToken(user._id,user.isAdmin)
      const refreshToken = createRefreshToken(user._id,user.isAdmin)
      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      const currentUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      //sending user details to client (for curr user)
      res.cookie("currentUser", JSON.stringify(currentUser));
      
      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });

      res.json({success:true, message: "Logged in successfully", token });
  };  


  export const refreshingToken = async (req, res, next) => {
    console.log("Cookies: ", req.cookies); 
    
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken)

  
    if (!refreshToken) {
      return next(new CustomError("No refresh token found", 401));
    }
  
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    } catch (err) {
      return next(new CustomError("Invalid or expired refresh token", 401));
    }
  
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new CustomError("User not found", 401));
    }
  
    const token = createToken(user._id, user.isAdmin);
    res.status(200).json({ message: "Token refreshed", token });
  };
  

export const logout = async (req, res, next) => {
  const cookieCleared = res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("currentUser", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("token", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  })

  if (!cookieCleared) {
    return next(new CustomError("Failed to log out. Please try again.", 500));
  }

  res.status(200).json({ success:true, message: "Logged out successfully" });
};
