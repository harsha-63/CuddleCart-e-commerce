import Cart from '../Models/cartModel.js'
import CustomError from '../Utils/customError.js'





//fuction for getUserCart
export const getUserCart = async(req,res)=>{

    const {userId} = req.params

    const cart = await Cart.findOne({userId}).populate({path:"products.productId",select:"name price image"})
    if(cart){
        res.status(200).json(cart)    
    }
    else{
        res.status(200).json({products:[]})
    }
}

//function for addToCart& updateCart
export const updateCart = async(req,res,next)=>{
    const {productId,quantity} = req.body
    if(!productId ){
        next(new CustomError("UserId and ProductId required",400))
    }
    if(quantity<1){
        next(CustomError("Quantity is not valid",400))
    }
    const cart = await Cart.findOne({userId})
    if(cart){
        const existingProduct = cart.products.find((p)=>p.productId.equals(productId))
        if(existingProduct> -1){
            cart.products[existingProduct].quantity = quantity
        }
        else{
            cart.products.push({productId,quantity});
        }
      
    }
    else{
        cart = new Cart({
            userId:req.user.id,
            products:[{productId,quantity:1}],
        });
        
    }
    await cart.save()
    //populate the cart
    await cart.populate({
        path: "products.productId",
        select: "name price image",
      });
      res.status(200).json({message:"Product added to cart",cart});
    
    
    
}

//function for DeleteProduct from cart

export const removeCartItem = async (req, res, next) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return next(new CustomError("User ID and Product ID are required", 400));
  }

  // Find the user's cart
  const cart = await Cart.findOne({ userId })
  if (!cart) {
    return next(new CustomError("Cart not found for the user", 404));
  }
  // Check if the product exists in the cart
  const productIndex = cart.products.find((p) =>
    p.productId.equals(productId)
  );

  if (productIndex === -1) {
    return next(
      new CustomError("Product not found in the user's cart", 404)
    );
  }
  // If product is found, remove it from the cart
  cart.products.splice(productIndex, 1);
  await cart.save()
  res.status(200).json({ message: "Product removed from cart", cart });
};

    
