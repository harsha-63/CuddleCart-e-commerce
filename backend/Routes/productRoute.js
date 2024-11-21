import express from 'express'
import { addToCart,updateCart,getAllProducts,getProductById,getProductsByCategory,deleteProduct } from '../Controllers/productController.js'

const productRouter = express.Router()

productRouter.post('/add',addToCart)
productRouter.put('/update',updateCart)
productRouter.delete('/delete/:id',deleteProduct)
productRouter.get('/products',getAllProducts)
productRouter.get('/products/:id',getProductById)
productRouter.get('/products/:category',getProductsByCategory)



export default productRouter