import { createContext, useState } from "react";



export const CartContext=createContext();
// eslint-disable-next-line react/prop-types
const CartProvider=({children})=>{
    const [userCart,setUserCart]=useState([])




    const value={userCart,setUserCart}
 return(
    <CartContext.Provider value={value}>
       {children}
    </CartContext.Provider>
 )
}
export default CartProvider