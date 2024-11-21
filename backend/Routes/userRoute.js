import express from  'express'
import { loginUser, registerUser } from "../Controllers/authController.js";
console.log(registerUser)

const userRouter =express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login', loginUser)


export default userRouter;