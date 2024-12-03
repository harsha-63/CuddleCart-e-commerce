import express from "express";
import { getAllUsers ,getUserById,blockUser } from "../Controllers/userController.js"
import { createProduct,deleteProduct,updateProduct,getAllProducts,getProductById,getProductsByCategory } from "../Controllers/productController.js";
import trycatch from "../Utils/tryCatch.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
import upload from '../Middlewares/multer.js'
import { getOrderByUser, getTotalOrders,getTotalPurchase,getTotalRevenue,shippingStatus,paymentStatus } from "../Controllers/orderController.js";


const admin = express.Router();

admin
// Admin routes for managing users 
    .get("/users", getAllUsers)
    .get('/users/:id',getUserById)
    .patch('/users/block/:id',blockUser)

//admin routes for managing products
    .get('/products',(getAllProducts))
    .get('/product/:id',(getProductById))
    .get('/products/category/:category',(getProductsByCategory))
    .post("/products",verifyToken,upload.single("image"), trycatch(createProduct))
    .put("/products/:productId",verifyToken,upload.single("image"),trycatch (updateProduct))
    .delete("/product/:productId",verifyToken, trycatch(deleteProduct))
    

//admin routes for managing orderDetails
    .get('/orders',verifyToken,trycatch(getTotalOrders))
    .get('/orders/:id',verifyToken,trycatch(getOrderByUser))
    .get('/stats/purchase',verifyToken,trycatch(getTotalPurchase))
    .get('/stats/revenue',verifyToken,trycatch(getTotalRevenue))
    .patch('/orders/shipping/:id',verifyToken,trycatch(shippingStatus))
    .patch('/orders/payment/:id',verifyToken,trycatch(paymentStatus))

export default admin;
