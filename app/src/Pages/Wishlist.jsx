import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WishlistContext } from '../Context/WishlistContext';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/product/${product.id}`} className="no-underline">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-3">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-gray-800">{product.name}</p>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-amber-950 transition duration-300"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;


