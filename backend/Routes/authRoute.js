import express from  'express'
import { adminLogin, loginUser, registerUser } from "../Controllers/authController.js";

const authRouter =express.Router();

authRouter
.post('/register',registerUser)
.post('/login', loginUser)
.post('/admin',adminLogin)


export default authRouter;