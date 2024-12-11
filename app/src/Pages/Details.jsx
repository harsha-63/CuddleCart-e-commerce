import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import axiosErrorManager from '../../utilities/axiosErrorManager';

const ProductDetails = () => {
  const { id } = useParams();
  console.log('Product ID:', id); 
  
  const { addToCart, userCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details when component mounts
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/product/${id}`);
        const { data } = response.data; 
        console.log('Product Data:', data); 
        setProduct(data);
        // if (data.category && data._id) {
        //   const relatedResponse = await axios.get("http://localhost:3002/user/products", {
        //     params: { category: data.category, excludeId: data._id },
        //   });
        //   setRelatedProducts(relatedResponse.data);
        // } else {
        //   console.warn('Skipping related products fetch: Missing category or ID');
        // }
      } catch (error) {
        console.error(axiosErrorManager(error));
      }
    };

    fetchProductDetails();
  }, [id,]);

  // Check if product is already in cart
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
        <div className="border p-4 rounded shadow-lg w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full h-full">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
          </div>
          <div className="flex flex-col justify-between p-4">
            <h2 className="text-2xl font-bold text-start">{product.name}</h2>
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
              <span>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((related) => (
            <NavLink key={related._id} to={`/product/${related._id}`} className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={related.image} alt={related.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900">{related.name}</h4>
                <p className="text-gray-700 mt-2">${related.price.toFixed(2)}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

     // Fetch related products by category
    //     const relatedResponse = await axios.get('http://localhost:3002/user/products');
    //     const related = relatedResponse.data
    // //     .filter(
    // //   (item) => item.category === data.category && item._id !== id
    // // );
    // // console.log('Filtered Related Products:', related);
    // setRelatedProducts(related);