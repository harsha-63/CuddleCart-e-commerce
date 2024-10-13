import { createContext,useState } from "react";

export const ShopContext=createContext()
// eslint-disable-next-line react/prop-types
const ShopProvider = ({children}) => {
    // const [products, setProducts] = useState([]);
    const [showSearch,setShowSearch]=useState(false)


  const value={showSearch,setShowSearch}
  return (
    <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
  )
}

export default ShopProvider