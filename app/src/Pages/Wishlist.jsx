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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Wishlist</h2>
      {userWishlist.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-center">Price</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {userWishlist.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                {/* Product Name and Image */}
                <td className="py-3 px-6 text-center flex items-center space-x-4">
                  <Link to={`/product/${product._id}`} className="no-underline flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-semibold text-gray-800">{product.name}</span>
                  </Link>
                </td>
                {/* Price */}
                <td className="py-3 px-6 text-center font-medium text-gray-800">
                  ${product.price}
                </td>
                {/* Add to Cart and Remove Buttons */}
                <td className="py-3 px-6 text-center space-x-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600 mt-10">Your wishlist is empty!</p>
      )}
    </div>
  );
}

export default Wishlist;





