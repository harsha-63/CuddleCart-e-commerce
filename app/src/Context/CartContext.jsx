import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie'

import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [userCart, setUserCart] = useState([]);
  const { currentUser } = useContext(UserContext);

  const calculateTotalPrice = () => {
    return Array.isArray(userCart) && userCart.reduce(
        (total, product) => total + product.productId.price * product.quantity, 
        0
    ).toFixed(2);
};
 

  // Fetch the user's cart when the component mounts or `currentUser` changes
  const getUserCart = async () => {
    if (!currentUser) return;
    const token = Cookies.get("token");
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:3002/user/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserCart(response.data?.products || []);   
    } catch (error) {
      console.error("Failed to fetch user cart:", error);
    }
  };
  
  useEffect(() => {
    getUserCart();
  }, [currentUser]);
  
  // Add a product to the cart
  const addToCart = async (productId, quantity = 1) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("User not authenticated. Please log in.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3002/user/cart",
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      await getUserCart(); 
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to add to cart.");
      console.error(error);
    }
  };
  

  // Remove a product from the cart
  const removeFromCart = async (productId) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("User not authenticated. Please log in.");
      return;
    }
    try {
      const res = await axios.delete("http://localhost:3002/user/cart", {
        data: { productId },
        headers: { Authorization: `Bearer ${token}` },
      });
      await getUserCart(); 
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to remove from cart.");
      console.error(error);
    }
  };
  

  const value = {userCart,setUserCart,addToCart,removeFromCart,getUserCart,calculateTotalPrice};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;








  // Update the quantity of a product in the cart
  // const updateQuantity = async (productID, action) => {
  //   try {
  //     const newQuantity =
  //       action === "increment" ? 1 : action === "decrement" ? -1 : 0;
  //     if (newQuantity !== 0) {
  //       await addToCart(productID, newQuantity); 
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update quantity.");
  //     console.error(error);
  //   }
  // };

  // Update the order on the server whenever it changes
  // const patchUpdatedOrder = async (updatedOrder) => {
  //   try {
  //     await axios.patch(
  //       "http://localhost:3002/user/order",
  //       { order: updatedOrder },
  //       { withCredentials: true }
  //     );
  //   } catch (error) {
  //     console.error("Failed to update user order:", error);
  //   }
  // };