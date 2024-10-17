import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { ShopContext } from '../Context/ShopContext';
import { UserContext } from '../Context/UserContext';


const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ShopContext);
  const { addToCart, userCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products) {
      const foundProduct = products.find(item => item.id === id);
      setProduct(foundProduct);
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
      navigate('/login');
      alert('Please log in to add items to the cart.');
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
    <div className="border p-4 rounded shadow-lg w-full md:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="w-full h-full">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
      </div>
      <div className="flex flex-col justify-between p-4">
        <h2 className="text-2xl font-bold text-start">{product.name}</h2>
        <p className="text-lg font-semibold text-start text-gray-800"> ${product.price.toFixed(2)}<span className='text-gray-600 '> & Free shipping</span></p>
        <p className='text-gray-700 text-start my-2 font-medium'>{product.description}</p>
        <p className='text-gray-700 text-start my-2'>{product.review}</p>

        
        
        <div className="text-start mt-4">
          <p className="text-sm text-gray-600">Category: {product.category}</p>
          <p className="text-sm text-gray-600">Rating: {product.stars} ⭐</p>
        </div>
        
        
        <div className="flex justify-start mt-4">
          {added ? (
            <button onClick={goToCart} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">Go To Cart</button>
          ) : (
            <button onClick={handleAddToCart} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">Add To Cart</button>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductDetails;