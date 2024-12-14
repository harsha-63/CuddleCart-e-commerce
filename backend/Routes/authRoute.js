import express from  'express'
import { adminLogin, loginUser, registerUser } from "../Controllers/authController.js";
import { refreshingToken,logout } from '../Controllers/authController.js';
import trycatch from "../Utils/tryCatch.js";

const authRouter =express.Router();

authRouter
.post('/register',registerUser)
.post('/login', loginUser)
.post('/admin',adminLogin)
.post("/refreshtoken",trycatch(refreshingToken)) 
.post("/logout",trycatch(logout)) 


export default authRouter;