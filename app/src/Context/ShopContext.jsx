import { createContext,useState ,useEffect} from "react";
import axiosInstance from "../../utilities/axiosInstance";

export const ShopContext=createContext()
// eslint-disable-next-line react/prop-types
const ShopProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false)
    useEffect(()=>{
      async function fetchdata() {
        try {
          const {data} = await axiosInstance.get("/user/products");
          setProducts(data.data);
          console.log(data.data);
          
          const uniqueCategories = [...new Set(data.data.map(product => product.category))];
          setCategories(['all', ...uniqueCategories]);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
            }
            fetchdata()  ;  
      
  },[])

  const value={showSearch,setShowSearch,selectedCategory,setSelectedCategory,categories,setCategories,products,search,setSearch,setProducts,setLoading,loading}
  return (
    <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
  )
}

export default ShopProvider