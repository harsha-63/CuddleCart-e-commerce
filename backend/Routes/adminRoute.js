import express from "express";
import { getAllUsers ,getUserById,blockUser } from "../Controllers/userController.js"
import { createProduct,deleteProduct,updateProduct,getAllProducts,getProductById,getProductsByCategory } from "../Controllers/productController.js";
import trycatch from "../Utils/tryCatch.js";
import { verifyAdminToken } from "../Middlewares/verifyToken.js";
import upload from '../Middlewares/multer.js'
import { getOrderByUser, getTotalOrders,getTotalPurchase,getTotalRevenue,shippingStatus,paymentStatus } from "../Controllers/orderController.js";


const admin = express.Router();

admin
// Admin routes for managing users 
    .get('/users', verifyAdminToken,(getAllUsers))
    .get('/user/:id',verifyAdminToken,(getUserById))
    .patch('/users/block/:id',verifyAdminToken,(blockUser))

//admin routes for managing products
    .get('/products',(getAllProducts))
    .get('/product/:id',(getProductById))
    .get('/products/category/:category',(getProductsByCategory))
    .post("/products",verifyAdminToken,upload.single("image"), trycatch(createProduct))
    .patch("/products/:productId",verifyAdminToken,upload.single("image"),trycatch (updateProduct))
    .delete("/product/:productId",verifyAdminToken, trycatch(deleteProduct))
    

//admin routes for managing orderDetails
    .get('/orders',verifyAdminToken,trycatch(getTotalOrders))
    .get('/orders/:id',verifyAdminToken,trycatch(getOrderByUser))
    .get('/stats/purchase',verifyAdminToken,trycatch(getTotalPurchase))
    .get('/stats/revenue',verifyAdminToken,trycatch(getTotalRevenue))
    .patch('/orders/shipping/:id',verifyAdminToken,trycatch(shippingStatus))
    .patch('/orders/payment/:id',verifyAdminToken,trycatch(paymentStatus))

export default admin;
