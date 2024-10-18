import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";


export const CartContext = createContext();



// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [userCart, setUserCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    return storedCart ? storedCart : [];
  });
  
  const [userOrder,setUserOrder]=useState(()=>{
    const storedOrder=JSON.parse(localStorage.getItem("order"))
    return storedOrder? storedOrder : []; })
  const { currentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    const fetchUserCart = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`http://localhost:4000/user/${currentUser.id}`);
          const userCartData = response.data.cart || [];
          const userOrdersData = response.data.order || [];
          setUserCart(userCartData);
          setUserOrder(userOrdersData);
        } catch (error) {
          console.error("Failed to fetch user cart:", error);
        }
      }
    };

    fetchUserCart();
  }, [currentUser]);



  const addToCart = (product) => {
    setUserCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      const updatedCart = existingProduct
        ? prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prevCart, { ...product, quantity: 1 }];

      patchUpdatedCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setUserCart((prevCart) => {
      const updatedCart = prevCart.filter(product => product.id !== productId);
      patchUpdatedCart(updatedCart).catch(error => {
        console.error("Failed to update cart on the server:", error);
      });
      return updatedCart;
    });
  };

  const updateQuantity = (productId, action) => {
    setUserCart((prevCart) => {
      const updatedCart = prevCart.map((product) => {
        if (product.id === productId) {
          const newQuantity = action === "increment" ? product.quantity + 1 : Math.max(product.quantity - 1, 1);
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      patchUpdatedCart(updatedCart);
      return updatedCart;
    });
  };

  const patchUpdatedCart = async (updatedCart) => {
    if (currentUser && currentUser.id) {
      try {
        await axios.patch(`http://localhost:4000/user/${currentUser.id}`, { cart: updatedCart });
        const updatedData = { ...currentUser, cart: updatedCart };
        setCurrentUser(updatedData);
        localStorage.setItem("currentUser", JSON.stringify(updatedData));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
   if(currentUser){
    localStorage.setItem("cart", JSON.stringify(userCart));
    localStorage.setItem("order", JSON.stringify(userOrder));
  }}, [ userOrder,userCart, currentUser]);

  const logoutUser = () => {
    setCurrentUser(null);
    setUserCart([]);
    setUserOrder([]);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    localStorage.removeItem('order');
  };

  const patchUpdatedOrder=(userOrder)=>{
    axios.patch(`http://localhost:4000/user/${currentUser?.id}`,{order:userOrder})
  }
  useEffect(()=>{
    if(currentUser!==null){
      patchUpdatedOrder(userOrder)
    }
  },[currentUser, userOrder])
  
  

  const value = { userCart, setUserCart, addToCart, removeFromCart, updateQuantity, logoutUser,patchUpdatedCart,userOrder,patchUpdatedOrder,setUserOrder};

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;