import { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

// eslint-disable-next-line react/prop-types
export const WishlistProvider = ({ children }) => {
  const [userWishlist, setUserWishlist] = useState([]);
  const {currentUser} = useContext(UserContext)

  const getUserWishlist = async () => {
    if (!currentUser) return;
    const token = Cookies.get("token");
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:3002/user/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserWishlist(response.data?.products || []); 
    } catch (error) {
      console.error("Failed to fetch user cart:", error);
    }
  };
  
  useEffect(() => {
    getUserWishlist();
  }, [currentUser]);
  const addToWishlist = async (productId) => {
    try {
      const token = Cookies.get("token");
  
      if (!token) {
        toast.error("You need to log in to add items to your wishlist.");
        return;
      }
      await axios.post("http://localhost:3002/user/wishlist", { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getUserWishlist();
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = Cookies.get("token");
  
      if (!token) {
        toast.error("You need to log in to remove items from your wishlist.");
        return;
      }
      await axios.delete("http://localhost:3002/user/wishlist",
        {
        headers: {
          Authorization: `Bearer ${token}`,
         },
         data: { productId },
       }
      );
      await getUserWishlist(); 
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product from wishlist");
    }
  };
  

  return (
    <WishlistContext.Provider value={{ userWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

