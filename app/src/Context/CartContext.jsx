import { useState, createContext, useContext, useEffect } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosInstance";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [userCart, setUserCart] = useState([]);
  const { currentUser,setLoading } = useContext(UserContext);
  


  const calculateTotalPrice = () => {
    return Array.isArray(userCart) && userCart.reduce((total, product) => total + product.productId.price * product.quantity,0).toFixed(2);
};
 

  // Fetch the user cart 
  const getUserCart = async () => {
    
    try {
      const response = await axiosInstance.get(`/user/cart` );
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
    try {
      const response = await axiosInstance.post(`/user/cart`,{ productId, quantity },);
      await getUserCart(); 
      console.log(response);
      
      // toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to add to cart.");
      console.error(error);
    }
  };
  

  // Remove a product from the cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axiosInstance.delete(`/user/cart`, {
        data: { productId },
      });
      await getUserCart(); 
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to remove from cart.");
      console.error(error);
    }
  };

  const updateCart = (productId, quantity) => {
    if (quantity < 1) return; 
    const updatedCart = userCart.map((item) => {
        if (item.productId._id === productId) {
            return { ...item, quantity };
        }
        return item;
    });
    setUserCart(updatedCart);
    updateServer(productId, quantity);
};

const updateServer = async (productId, quantity) => {
    setLoading(true);
    try {
        await axiosInstance.post('/user/cart',{productId,quantity});
    } catch (error) {
        console.error(axiosErrorManager(error));
    } finally {
        setLoading(false);
    }
};

const calculateSubtotal = (price, quantity) => (price * quantity).toFixed(2);
  

  const value = {userCart,setUserCart,addToCart,removeFromCart,getUserCart,calculateTotalPrice,updateCart,calculateSubtotal};

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