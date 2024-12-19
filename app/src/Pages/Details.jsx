import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosErrorManager from '../../utilities/axiosErrorManager';
import { ShopContext } from '../Context/ShopContext';

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation(); 
  const navigate = useNavigate();

  const { addToCart, userCart } = useContext(CartContext);
  const { products } = useContext(ShopContext);
  const { currentUser } = useContext(UserContext);
  
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Fetch product details when component mounts or id changes
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/product/${id}`);
        const { data } = response.data;
        setProduct(data);
      } catch (error) {
        console.error(axiosErrorManager(error));
      }
    };
    fetchProductDetails();
  }, [id]);

  // Smooth scroll to top when id (or location) changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (product && Array.isArray(userCart)) {
      const includedProduct = userCart.some(item => item.productId._id === id);
      setAdded(includedProduct);
    }
  }, [id, product, userCart]);

  const handleAddToCart = () => {
    if (currentUser) {
      addToCart(product);
    } else {
      toast('Please log in.');
      navigate('/login');
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
      <div className="border p-4 rounded shadow-lg w-full sm:w-2/5 md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="w-full h-full">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
          </div>
          <div className="flex flex-col justify-between p-4">
            <h2 className="text-2xl font-semibold text-start">{product.name}</h2>
            <p className="text-lg font-semibold text-start text-gray-800">
              ${product.price} <span className="text-gray-600"> & Free shipping</span>
            </p>
            <p className="text-gray-700 text-start my-2 font-medium">{product.description}</p>
            <p className="text-gray-700 text-start my-2">{product.review}</p>
            <div className="text-start mt-4">
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">Rating: {product.stars} ⭐</p>
            </div>
            <div className="flex justify-start mt-4">
              {added ? (
                <button onClick={goToCart} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                  Go To Cart
                </button>
              ) : (
                <button onClick={handleAddToCart} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-serif mb-8 text-gray-800">Related Products___</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(item => item.category === product.category && item._id !== product._id)
            .slice(0, 8)
            .map(product => (
              <NavLink
                to={`/product/${product._id}`}
                key={product._id}
                className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

