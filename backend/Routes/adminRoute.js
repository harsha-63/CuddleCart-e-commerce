import express from "express";
import { getAllUsers ,getUserById,blockUser } from "../Controllers/userController.js"
import { createProduct,deleteProduct,getTotalPurchase,getTotalRevenue,updateProduct } from "../Controllers/productController.js";
import trycatch from "../Utils/tryCatch.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { getOrderByUser, getTotalOrders } from "../Controllers/orderController.js";


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
    .get('/purchase',verifyToken,trycatch(getTotalPurchase))
    .get('/revenue',verifyToken,trycatch(getTotalRevenue))

//admin routes for managing orderDetails
    .get('/orders',verifyToken,trycatch(getTotalOrders))
    .get('/orders/:id',verifyToken,trycatch(getOrderByUser))

export default admin;
