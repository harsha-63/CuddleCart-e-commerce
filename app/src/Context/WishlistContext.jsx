import { createContext, useState } from 'react';

export const WishlistContext = createContext();

// eslint-disable-next-line react/prop-types
const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]); 

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product]; 
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id)); 
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children} 
    </WishlistContext.Provider>
  );
};
export default WishlistProvider
