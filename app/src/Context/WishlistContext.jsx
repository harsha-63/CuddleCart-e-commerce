import { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utilities/axiosInstance';

export const WishlistContext = createContext();

// eslint-disable-next-line react/prop-types
export const WishlistProvider = ({ children }) => {
  const [userWishlist, setUserWishlist] = useState([]);
  const {currentUser} = useContext(UserContext)

  const getUserWishlist = async () => {
    if (!currentUser) return;
    try {
      const response = await axiosInstance.get('/user/wishlist',);
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
      await axiosInstance.post(`/user/wishlist`, { productId },
      );
      await getUserWishlist();
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axiosInstance.delete(`/user/wishlist`,
        {
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

