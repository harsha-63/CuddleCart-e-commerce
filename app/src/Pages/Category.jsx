import { NavLink, useParams} from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from 'axios'
import axiosErrorManager from "../../utilities/axiosErrorManager";

const CategoryPage = () => {
  const { category } = useParams(); 
  const {setLoading } = useContext(ShopContext); 
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3002/user/products/category/${category}`, {
        });
        console.log(response.data);
        
        setProducts(response.data.data); 
      } catch (error) {
        console.error(axiosErrorManager(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return(
  <div className="container mx-auto p-4 mt-5">
  <h1 className="text-4xl font-serif mb-7 text-center">{category} Collection</h1>
  {products && products.length > 0 ? ( // Ensure products is defined and not empty
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <NavLink to={`/product/${product._id}`} key={product._id} className="border rounded-lg shadow-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
        </NavLink>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No products found in this category.</p>
  )}
</div>

  );
};

export default CategoryPage;
