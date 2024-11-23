import Order from '../Models/orderModel.js'
import CustomError from '../Utils/customError.js'
import Cart from '../Models/cartModel.js'



//function for createOrder
export const createOrder = async(req,res,next)=>{
    const{userId,userDetails} = req.body
    const cart = await Cart.findOne({userId})
    if(!cart||cart.products.length ===0){
        return next(new CustomError("cart is empty.cannot place the order"),400)
    }
    const order = new Order({
       userId,
       products:cart.products,
       userDetails
    })
    order.paymentStatus = "cash on delivery"
    order.shippingStatus = "processing"
    await order.save().populate("products.productId", "name price image");

    // Clear the cart after placing the order
    cart.products = [];
    await cart.save();
    res.status(201).json({date:order,cart:cart})
}

//function for getUserOrders
export const getOrders = async(req,res)=>{
        const {userId} = req.params
        const orders = await Order.find({userId})
          .populate("products.productId", "name price image")
          .sort({ createdAt: -1 });
      
        // sending the orders or an empty array if none found
        if (orders) {
          res.status(200).json({ data: orders });
        } else {
          res.status(200).json({message:"No orders for this "});
        }
      };



//function for getSingleOrder
export const getOneOrder = async(req,res,next)=>{
    const {userId,orderId} = req.params
    const order = new Order.findOne({
        orderId,
        userId
    }).populate("products.productId", "name price image")
    if (!order) {
        return next(new CustomError("Order not found", 404));
      }
      res.status(200).json({ order });

}

//function for cancelOrder
export const cancelOrder = async(req,res,next)=>{
   const {userId,orderId} = req.params
   const order = new Order.findOneAndUpdate(
    {orderId,userId},
    {$set:{shippingStatus:"cancelled"}},
    {new:true}
        
);
    if(!order){
        return next(new CustomError("order not found"),404)
    }
    res.status(200).json({message:"Order Cancelld"})
}