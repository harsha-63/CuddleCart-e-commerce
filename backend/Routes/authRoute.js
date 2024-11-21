import express from 'express'
import{getAllProducts,getProductById,getProductsByCategory } from '../Controllers/productController.js'
import { addToCart,updateCart,deleteProduct } from '../Controllers/cartController.js'

const productRouter = express.Router()


productRouter

//route for the products
.get('/products',getAllProducts)
.get('/product/:id',getProductById)
.get('/products/:category',getProductsByCategory)


//route for cartProduct
.get('/')
.post('/add',addToCart)
.put('/update',updateCart)
.delete('/delete/:id',deleteProduct)



export default productRouter