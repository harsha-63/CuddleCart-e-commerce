import Cart from '../Models/cartModel.js'





//fuction for getUserCart
export const getUserCart = async(req,res)=>{
    try{
    const {userId} = req.params

    const cart = await Cart.findOne({userId}).populate("products.productId")
    if(!cart){
        return res.status(404).json({success:false,message:"cart not found"})
    }
    res.status(200).json(cart.products)
}
 catch(error){
    console.log(error);
    res.status(500).json({success:false,message:error.message})
    
 }
    

}

//function for addToCart
export const addToCart = async(req,res)=>{
    
    
}

//function for updateCart
export const updateCart = async(req,res)=>{
    
}

//function for DeleteProduct from cart
export const deleteProduct = async(req,res)=>{
    
}