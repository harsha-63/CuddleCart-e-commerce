import User from '../Models/userModel.js'
import CustomError from '../Utils/customError.js'

//function for getAllUsers
export const getAllUsers = async (req,res,next)=>{
    const users = await User.find({},{password:0})
    if (!users || users.length === 0) {
        return next(new CustomError("No users found", 404));
    }
    res.status(200).json({success: true,users:users});

}


//function for getAllUsers
export const getUserById = async (req,res,next)=>{
    const { id } = req.params;
    const user = await User.findById(id, { password: 0 }); 
    if (!user) {
        return next( new CustomError("User not found", 404)); 
      }
    res.status(200).json({success: true,user:user});
    
}



