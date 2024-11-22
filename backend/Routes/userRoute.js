import express from 'express'
import{getAllProducts,getProductById,getProductsByCategory } from '../Controllers/productController.js'
import { updateCart,removeCartItem, getUserCart } from '../Controllers/cartController.js'
import {getUserWishlist,addToWishlist,removeFromWishlist} from '../Controllers/wishlistController.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import trycatch from '../Utils/tryCatch.js'

const router = express.Router()


router

//route for the products
    .get('/products',getAllProducts)
    .get('/product/:id',getProductById)
    .get('/products/:category',getProductsByCategory)

//route for cartProduct
    .get('/cart',verifyToken,trycatch (getUserCart))
    .post('/cart',verifyToken,trycatch(updateCart))
    .delete('/cart',verifyToken,trycatch(removeCartItem))

//route for WishlistProduct
    .get('/wishlist',verifyToken,trycatch(getUserWishlist))
    .post('/wishlist',verifyToken,trycatch(addToWishlist))
    .delete('/wishlist',verifyToken,trycatch(removeFromWishlist))

export default router