import Order from '../Models/orderModel.js'
import CustomError from '../Utils/customError.js'
import Cart from '../Models/cartModel.js'
import stripe from 'stripe'



//function for createOrder by COD

export const placeOrder = async (req, res, next) => {
  const { userDetails,totalAmount } = req.body;  

  if (!userDetails) {
    return next(new CustomError("User details are required to place the order", 400));
  }

  // Find the cart for the user
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart || cart.products.length === 0) {
    return next(new CustomError("Cart is empty. Cannot place the order", 400));
  }
  

  // Check for unavailable products in the cart
  const unAvailableProducts = cart.products.some((product) => product.isDeleted === true);
  if (unAvailableProducts) {
    return next(new CustomError("some products are not available", 400));
  }


  // Create a new order
  let order = new Order({
    userId: req.user.id,
    products: cart.products,
    userDetails,
    totalAmount,
    paymentMethod: "cash on delivery",
    paymentStatus:"pending",
    shippingStatus: "processing",
  });

  // Save the order
  await order.save();

  // Clear the cart
  cart.products = [];
  await cart.save();

  res.status(201).json({ success: true, message: "Order created successfully", order });
};


//function for placeOrder by Stripe

export const orderStripe = async (req, res, next) => {
  const { userDetails,totalAmount } = req.body;  
  // const {origin} = req.headers
  // Validate user details
  if (!userDetails) {
    return next(new CustomError("User details are required to place the order", 400));
  }

  // Find the cart for the user
  const cart = await Cart.findOne({ userId: req.user.id }).populate({
    path: "products.productId",
    select: "name price image",
  });
  // console.log(cart.products)

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
      unit_amount: Math.round(product.productId.price * product.quantity*100), 
    },
    quantity: product.quantity,
  }
));
console.log(line_items);


  const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

  // Create a Stripe session
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  const newTotal=Math.round(totalAmount*100)

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
  order.paymentStatus = "Paid";
  await order.save();

  // Respond with success message
  res.status(200).json({success:true,message: "Order placed successfully!"});
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
  const order = await Order.findOne({
    _id: req.params.orderId,
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
  res.status(200).json({ status: "success", message: "Order cancelled" });
};
export const publicKeySend = async (req, res) => {
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
export const getOrderByUser = async(req,res)=>{
    const orders = await Order.find({userId:req.params.id})
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  if (!orders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: orders });

}

 //function for getTotalPurchase
 export const getTotalPurchase = async (req, res, next) => {
  // Aggregate query to calculate total products purchased
  const totalPurchase = await Order.aggregate([
    { $match: { shippingStatus: { $ne: "Cancelled" } } },
    { $unwind: "$products" }, // Flatten the products array
    { $group: { _id: null, totalProducts: { $sum: "$products.quantity" } } } // Calculate total quantity
  ]);

  // If no products are found
  if (!totalPurchase || totalPurchase.length === 0) {
    return next(new CustomError("No products purchased found", 404));
  }

  // Extract the total products quantity
  const total = totalPurchase[0].totalProducts;

  // Return the total purchase quantity
  res.status(200).json({ success: true, totalPurchase: total });
};



//function for getTotalRevenue
export const getTotalRevenue = async (req, res) => {
  // Find all orders
  const orders = await Order.find();

  // Check if orders exist
  if (!orders || orders.length === 0) {
    return res.status(200).json({ message: "No orders found" });
  }

  // Filter out cancelled orders
  const nonCancelledOrders = orders.filter(
    (order) => order.shippingStatus !== "Cancelled"
  );

  // Calculate total revenue
  const revenue = nonCancelledOrders.reduce((acc, order) => {
    if (order.totalAmount && !isNaN(order.totalAmount)) {
      return acc + order.totalAmount;
    }
    return acc; 
  }, 0);
  res.status(200).json({success:true, data: revenue });
};

//update ShippingStatus
export const shippingStatus = async (req, res, next) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { shippingStatus: req.body.status } },
    { new: true }
  );
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  res
    .status(200)
    .json({ status: "success", message: "Order status updated successfully" });
};


//update paymentStatus
export const paymentStatus = async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  if (order.paymentStatus === "Paid") {
    return next(new CustomError("You can't update this order", 400));
  }
  order.paymentStatus = "Paid";
  await order.save();
  res
    .status(200)
    .json({ status: "success", message: "Order status updated successfully" });
};



