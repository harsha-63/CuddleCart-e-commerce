import  { useContext } from 'react'
import { Link } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function wishlist() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { userWishlist ,removeFromWishlist} = useContext(WishlistContext);


    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {userWishlist.map((product,index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
        <Link to={`/product/${product._id}`} className="no-underline">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        </Link>
        <div className="p-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg text-gray-800">{product.name}</p>
            <button
              onClick={() => removeFromWishlist(product._id)}>
              <FontAwesomeIcon icon={faTrashCan}/>
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
  
export default wishlist



