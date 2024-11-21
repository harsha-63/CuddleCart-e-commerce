import express from  'express'
import { loginUser, registerUser } from "../Controllers/authController.js";
console.log(registerUser)

const authRouter =express.Router();

authRouter
.post('/register',registerUser)
.post('/login', loginUser)


export default authRouter;