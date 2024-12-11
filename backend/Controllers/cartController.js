import Cart from "../Models/cartModel.js";
import CustomError from "../Utils/customError.js";

//fuction for getUserCart
export const getUserCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate({ path: "products.productId",select: "name price image"});
  console.log(cart);
  
  if (cart) {
    res.status(200).json(cart);

  } else {
    res.status(200).json({products:[]});
  }
};

//function for addToCart& updateCart
export const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return next(new CustomError("ProductId is required", 400));
  }
  if (quantity < 1) {
    return next(new CustomError("Quantity is not valid", 400));
  }

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({
      userId: req.user.id,
      products: [{ productId, quantity }],
    });
   
  } else {
     // Check if the product exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId.toString() == productId
    );

    if (existingProductIndex > -1) {
      // Update the quantity of the existing product
      cart.products[existingProductIndex].quantity = quantity;
    } else {
      // If product doesn't exist, add it to the cart
      cart.products.push({ productId, quantity });
    }
  }

  await cart.save();
  console.log(cart);

  res.status(200).json({ message: "Cart updated successfully" });
};

//function for DeleteProduct from cart

export const removeCartItem = async (req, res, next) => {
    const { productId } = req.body;

    if (!productId) {
      return next(new CustomError("Product ID is required", 400));
    }
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return next(new CustomError("Cart not found for the user", 404));
    }

    // Find the index of the product in the cart
    const productIndex = cart.products.findIndex(
      (p) =>p.productId.toString() == productId
    );

    // If product not found, return an error
    if (productIndex === -1) {
      return next(new CustomError("Product not found in the user's cart", 404));
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();
    console.log(cart);

    // Return success response
    res.status(200).json({ message: "Product removed from cart" });
  };
