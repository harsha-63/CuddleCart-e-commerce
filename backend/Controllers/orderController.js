import Order from '../Models/orderModel.js'
import CustomError from '../Utils/customError.js'
import Cart from '../Models/cartModel.js'



//function for createOrder

export const createOrder = async (req, res, next) => {
    const { userDetails } = req.body;

    if (!userDetails) {
        return next(new CustomError("User details are required to place the order", 400));
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || cart.products.length === 0) {
        return next(new CustomError("Cart is empty. Cannot place the order", 400));
    }

    // Check for invalid products in the cart
    const invalidProducts = cart.products.filter((p) => !p.productId);
    if (invalidProducts.length > 0) {
        return next(new CustomError("Cart contains invalid products", 400));
    }

    // Create a new order
    let order = new Order({
        userId: req.user.id,
        products: cart.products,
        userDetails,
        paymentStatus: "cash on delivery",
        shippingStatus: "processing",
    });
    console.log(order);
    await order.save();
    
    

    // Clear the cart
    cart.products = [];
    await cart.save();

    // Respond with the order and updated cart
    res.status(201).json({success: true, message: "Order created successfully"});
};




//function for getUserOrders
export const getOrders = async(req,res)=>{
        const orders = await Order.find({userId:req.user.id})
          .populate("products.productId", "name price image")
          .sort({ createdAt: -1 });
      
        // sending the orders or an empty array if none found
        if (orders) {
          res.status(200).json({ data: orders });
        } else {
          res.status(200).json({message:"No orders for this user "});
        }
      };



//function for getSingleOrder
export const getOneOrder = async (req, res, next) => {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id,
    }).populate("products.productId", "name price image");
    if (!order) {
      return next(new CustomError("Order not found", 404));
    }
    res.status(200).json({ order });
  };

//function for cancelOrder
export const cancelOrder = async (req, res, next) => {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId, userId: req.user.id },
      { $set: { shippingStatus: "Cancelled" } },
      { new: true }
    );
    if (!order) {
      return next(new CustomError("Order not found", 404));
    }
    res.status(200).json({ message: "Order cancelled" });
  };