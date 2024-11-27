import express from "express";
import { getAllUsers ,getUserById,blockUser } from "../controllers/userController.js";
import { createProduct,deleteProduct,updateProduct } from "../Controllers/productController.js";
import trycatch from "../Utils/tryCatch.js";
import { verifyToken } from "../Middlewares/verifyToken.js";


const admin = express.Router();

admin

// Admin routes for managing users 
    .get("/users", getAllUsers)
    .get('/users/:id',getUserById)
    .patch('/users/block/:id',blockUser)

//admin routes for managing products
    .post("/products",verifyToken, trycatch(createProduct))
    .delete("/products/:productId",verifyToken,trycatch(deleteProduct))
    .put("/products/:productId",verifyToken,trycatch (updateProduct))

export default admin;
