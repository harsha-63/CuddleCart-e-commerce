import { NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { WishlistContext } from "../Context/WishlistContext";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CategoryPage = () => {
  const { category } = useParams();
  const { setLoading } = useContext(ShopContext);
  const { addToWishlist, userWishlist } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/user/products/category/${category}`);
        setProducts(response.data.data);
      } catch (error) {
        console.error(axiosErrorManager(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, setLoading]);

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  return (
    <div className="container mx-auto  mt-5">
      <h1 className="text-4xl font-serif mb-7 text-center">{category} Collection</h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
            >
              <NavLink to={`/product/${product._id}`} className="w-full h-full block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900">{product.name}</h4>
                  <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
                </div>
              </NavLink>

              <div
                onClick={() => handleAddToWishlist(product)}
                className="absolute bottom-4 right-4 cursor-pointer text-red-500"
              >
                {userWishlist.some((item) => item._id === product._id) ? (
                  <FaHeart size={18} />
                ) : (
                  <FaRegHeart size={18} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;

