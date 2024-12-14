import Order from '../Models/orderModel.js'
import CustomError from '../Utils/customError.js'
import Cart from '../Models/cartModel.js'
import stripe from 'stripe'
import mongoose from 'mongoose'



//function for createOrder by COD

export const placeOrder = async (req, res, next) => {
  const { userDetails,totalAmount } = req.body;  

  if (!userDetails) {
    return next(new CustomError("User details are required to place the order", 400));
  }

  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart || cart.products.length === 0) {
    return next(new CustomError("Cart is empty. Cannot place the order", 400));
  }
  
  const unAvailableProducts = cart.products.some((product) => product.isDeleted === true);
  if (unAvailableProducts) {
    return next(new CustomError("some products are not available", 400));
  }

  let order = new Order({
    userId: req.user.id,
    products: cart.products,
    userDetails,
    totalAmount,
    paymentMethod: "cash on delivery",
    paymentStatus:"pending",
    shippingStatus: "processing",
  });

  await order.save();

  // Clear the cart
  cart.products = [];
  await cart.save();

  res.status(201).json({ success: true, message: "Order created successfully"});
};


//function for placeOrder by Stripe
export const orderStripe = async (req, res, next) => {
  const { userDetails,totalAmount } = req.body;  
  if (!userDetails) {
    return next(new CustomError("User details are required to place the order", 400));
  }

  const cart = await Cart.findOne({ userId: req.user.id }).populate({
    path: "products.productId",
    select: "name price image",
  });


  if (!cart || cart.products.length === 0) {
    return next(new CustomError("Cart is empty. Cannot place the order", 400));
  }
  // Prepare line items for Stripe
  const line_items = cart.products.map((product) => (
    {
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.productId.name, 
      },
      unit_amount: Math.round(product.productId.price * product.quantity), 
    },
    quantity: product.quantity,
  }
));
console.log(line_items);

//gateway initialization
  const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

  // Create a Stripe session
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3002/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3002/cancel`,
  });

  const newTotal=Math.round(totalAmount)

  // Create an order in the database
  const orderData = new Order({
    userId: req.user.id,
    products: cart.products,
    userDetails,
    totalAmount:newTotal,
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
    shippingStatus: 'processing',
    sessionId: session.id, 
  });

  await orderData.save();

  // Clear the cart
  cart.products = [];
  await cart.save();

  // Respond with the session ID and URL
  res.status(201).json({
    success: true,
    message: 'Order created successfully. Proceed to payment.',
    sessionId: session.id,
    stripeUrl: session.url,
  });
};

//function for successStripe
 export const stripeSuccess = async (req, res, next) => {
  const sessionId = req.params.sessionId;

  // Find the order by sessionId
  const order = await Order.findOne({ sessionId: sessionId });
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }

  // Update the order status
  order.shippingStatus = "shipped";
  order.paymentStatus = "paid";
  await order.save();

  // Respond with success message
  res.status(200).json({success:true,message: "Order placed successfully!"});
};






//function for getUserOrders
export const getOrders = async(req,res)=>{
     const orders = await Order.find({userId:req.user.id})
      .populate("products.productId", "name price image")
      .sort({ createdAt: -1 });
      
     if (orders) {
        res.status(200).json( orders );
     } else {
        res.status(200).json({message:"No orders for this user "});
    }
};



//function for getSingleOrder
export const getOneOrder = async (req, res, next) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return next(new CustomError("Invalid order ID format", 400));
  }
  const order = await Order.findOne({
    _id: orderId,
    userId: req.user.id,
  }).populate("products.productId", "name price image");
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ order });
};


//function for cancelOrder
export const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return next(new CustomError("Invalid order ID format", 400));
  }
  const order = await Order.findOne({
    _id: orderId,
    userId: req.user.id,
  });
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  if (order.paymentStatus === "paid") {
    return next(new CustomError("You can't cancel this order", 400));
  }
  order.shippingStatus = "cancelled";
  order.paymentStatus = "cancelled";
  await order.save();
  res.status(200).json({ success: true, message: "Order cancelled" });
};

export const publicKey = async (req, res) => {
  res.status(200).json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
};
                             


                                        //functions for orderDetails to admin

//function for getTotalOrders
export const getTotalOrders = async(req,res)  =>{
    const orders = await Order.find()
      .populate("products.productId", "name price image")
      .sort({ createdAt: -1 });
    if(!orders){
      return res.status(404).json({message:"No orders found"})
    }
    res.status(200).json({data:orders})
    
}  

//funtion for getOrderByUser
export const getOrderByUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const orders = await Order.find({ userId: id })
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  if (!orders || orders.length === 0) {
    return next(new CustomError("No orders found", 404));
  }
  res.status(200).json({ data: orders });
};


 //function for getTotalPurchase
 export const getTotalPurchase = async (req, res, next) => {
  const totalPurchase = await Order.aggregate([
    { $match: { shippingStatus: { $ne: "cancelled" } } },
    { $unwind: "$products" }, 
    { $group: { _id: null, totalProducts: { $sum: "$products.quantity" } } } 
  ]);
  if (!totalPurchase || totalPurchase.length === 0) {
    return next(new CustomError("No products purchased found", 404));
  }
  const total = totalPurchase[0].totalProducts;
  res.status(200).json({ success: true, totalPurchase: total });
};



//function for getTotalRevenue
export const getTotalRevenue = async (req, res) => {
  const orders = await Order.find();
  if (!orders || orders.length === 0) {
    return res.status(200).json({ message: "No orders found" });
  }
   const revenue = await Order.aggregate([
    {$match:{shippingStatus: { $ne: "cancelled"}}},
    {$group:{_id:null,totalRevenue:{$sum:"$totalAmount"}}}
   ])
   const totalRevenue =revenue[0].totalRevenue

  res.status(200).json({success:true,  totalRevenue:totalRevenue });
};

//update ShippingStatus
export const shippingStatus = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError("Invalid order ID format", 400));
  }
  
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }

  if (order.shippingStatus === "delivered") {
    return next(new CustomError("You can't update this order", 400));
  }

  order.shippingStatus = "delivered" ;
  await order.save();

  res.status(200).json({ status: "success", message: "Order shipping status updated successfully" });
};



//update paymentStatus
export const paymentStatus = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError("Invalid order ID format", 400));
  }
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  if (order.paymentStatus === "paid") {
    return next(new CustomError("You can't update this order", 400));
  }
  order.paymentStatus = "paid";
  await order.save();
  res.status(200).json({ status: "success", message: "Order status updated successfully" });
};



