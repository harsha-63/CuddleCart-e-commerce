import Wishlist from '../Models/wishlistModel.js'
import CustomError from '../Utils/customError.js'

//function for getUserWishlist
export const getUserWishlist = async(req,res)=>{
    const userId = req.params
    const wishlist = await Wishlist.findOne({userId}).populate("products")
  if(wishlist){
    res.status(200).json(wishlist)
  }
  else{
    res.status(200).json({products:[]})
  }
}


//function for addToWishlist
export const addToWishlist = async(req,res,next)=>{
    const {productId} = req.body
    if(!productId){
        return next(new CustomError("product id is requierd",400))
    }
    const userId = req.user.id; 
    const wishlist = await Wishlist.findOneAndUpdate(
        {userId},
        {$addToSet:{products:productId}},
        {new:true}
    )
    if(!wishlist){
        wishlist = new Wishlist({
            userId,
            produts:[
                productId
            ]
        })
        await wishlist.save()
    }
    res.status(200).json({success:true,message:"Product added to wishlist"})
    
}


//function for removeFromWishlist
export const removeFromWishlist = async(req,res)=>{
    const {productId}= req.body
    if(!productId){
        return next(new CustomError("product id is requierd",400))
    }
    const userId = req.user.id; 
    const wishlist = await Wishlist.findOneAndUpdate(
        { userId},
        { $pull: { products: productId } }, 
        { new: true }
      );
  
      if (!wishlist) {
        return res.status(404).json({ success: false, message: 'Wishlist not found' });
      }
  
      res.status(200).json({ success: true, wishlist });
    
}