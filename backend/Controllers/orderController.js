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

    // // Check for invalid products in the cart
    const invalidProducts = cart.products.filter((p) => !p.productId);
    if (invalidProducts.length > 0) {
        return next(new CustomError("Cart contains invalid products", 400));
    }

    // Create a new order
    let order = new Order({
        userId: req.user.id,
        products: cart.products,
        userDetails,
        totalAmount,
        paymentStatus: "cash on delivery",
        shippingStatus: "processing",
    });
    console.log(order);
    await order.save();
    // Clear the cart
    cart.products = [];
    await cart.save();
    res.status(201).json({success: true, message: "Order created successfully"});
};

//function for placeOrder by Stripe


export const orderStripe = async (req, res, next) => {
  const { userDetails, totalAmount } = req.body;

  // Validate user details
  if (!userDetails) {
    return next(new CustomError("User details are required to place the order", 400));
  }

  // Find the cart for the user
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart || cart.products.length === 0) {
    return next(new CustomError("Cart is empty. Cannot place the order", 400));
  }

  // Prepare line items for Stripe
  const line_items = cart.products.map((product) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.name, 
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
  // Create a Stripe session
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  // Create an order in the database
  const orderData = new Order({
    userId: req.user.id,
    products: cart.products,
    userDetails,
    totalAmount,
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
    shippingStatus: 'pending',
    sessionId: session.id, // Save Stripe session ID for tracking
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
  const totalPurchase = new Order.aggregate([
      {$unwind:"$products"},{$group:{_id:null,totalProducts:{$sum:"$products.quantity"}}}
  ])

  if (!totalPurchase || totalPurchase.length === 0) {
    return next(new CustomError("No products purchased found", 404));
  }

  const total = totalPurchase[0].totalProducts;

  res.status(200).json({success: true,totalPurchase: total});
};

//function for getTotalRevenue
export const getTotalRevenue = async (req, res) => {
  const totalOrders = await Order.find();
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  const nonCancelledOrders = totalOrders.filter(
    (order) => order.shippingStatus !== "Cancelled"
  )
  const revenue = nonCancelledOrders.reduce((acc, order) => {
    return acc + order.totalAmount;
  }, 0);
  res.status(200).json({ data: revenue });
};


