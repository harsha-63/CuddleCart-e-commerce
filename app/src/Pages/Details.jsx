import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { ShopContext } from '../Context/ShopContext';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ShopContext);
  const { addToCart, userCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    if (products) {
      const foundProduct = products.find(item => item.id === id);
      setProduct(foundProduct);

      if (foundProduct) {
        const related = products.filter(
          item => item.category === foundProduct.category && item.id !== id
        );
        setRelatedProducts(related);
      }
    }
  }, [id, products]);

  useEffect(() => {
    if (product && userCart) {
      const includedProduct = userCart.some(item => item.id === product.id);
      setAdded(includedProduct);
    }
  }, [product, userCart]);

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
              ${product.price.toFixed(2)}<span className="text-gray-600"> & Free shipping</span>
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
              <span> <FontAwesomeIcon icon={faHeart} /></span>
            </div>
          </div>
        </div>
      </div>
  
      {/* Related Products Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map(related => (
            <NavLink
              key={related.id} to={`/product/${related.id}`}
              className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={related.image}
                alt={related.name}
                className="w-full h-48 object-cover"
              />
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
}  

export default ProductDetails;
