import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import { CartContext } from '../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Wishlist() {
  const { userWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-serif mb-6 text-center text-black">Your Wishlist</h2>
      {userWishlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
          {userWishlist.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
            >
              {/* Product Image and Name */}
              <Link to={`/product/${product._id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 pb-5">
                  <h4 className="text-lg font-semibold text-gray-800" >{product.name}</h4>
                  <p className="text-gray-700 mt-2">${product.price}</p>
                </div>
              </Link>

              {/* Actions: Add to Cart and Remove */}
              <div className="absolute bottom-4 right-4 space-x-4 flex">
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-1 bg-green-500 text-white font-sans rounded-md hover:bg-green-600 transition-all duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-red-500 hover:text-red-600 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faTrashCan} size="lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">Your wishlist is empty!</p>
      )}
    </div>
  );
}

export default Wishlist;








