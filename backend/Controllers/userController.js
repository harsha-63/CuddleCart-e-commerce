import Users from '../Models/userModel.js'
import CustomError from '../Utils/customError.js'
import mongoose from 'mongoose'

//function for getAllUsers
export const getAllUsers = async (req,res,next)=>{
    const users = await Users.find({},{password:0})
    if (!users || users.length === 0) {
        return next(new CustomError("No users found", 404));
    }
    res.status(200).json({success: true,users:users});

}


//function for getAllUsers
export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const user = await Users.findById(id, { password: 0 });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  res.status(200).json({ success: true, user });
};


//funtion for managing block key of user
export const blockUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const user = await Users.findById(id);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  user.isBlock = !user.isBlock;
  await user.save();
  res.status(200).json({success:true,message: user.isBlock ? "User blocked" : "User unblocked"});
};




