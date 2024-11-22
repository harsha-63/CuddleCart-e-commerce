import express from 'express'
import{getAllProducts,getProductById,getProductsByCategory } from '../Controllers/productController.js'
import { updateCart,removeCartItem, getUserCart } from '../Controllers/cartController.js'
import { verifyToken } from '../Middlewares/verifyToken.js'

const productRouter = express.Router()


productRouter

//route for the products
    .get('/products',getAllProducts)
    .get('/product/:id',getProductById)
    .get('/products/:category',getProductsByCategory)


//route for cartProduct
    .get('/cart',verifyToken,getUserCart)
    .post('/cart',verifyToken,updateCart)
    .delete('/cart',verifyToken,removeCartItem)



export default productRouter