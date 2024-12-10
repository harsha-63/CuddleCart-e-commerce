import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import axiosErrorManager from '../../utilities/axiosErrorManager';  
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

const Cart = () => {
    const {setLoading} = useContext(UserContext)
    const { userCart,setUserCart, removeFromCart, addToCart, } = useContext(CartContext);
    

    const updateCart = (productID, quantity) => {
        const updatedCart = userCart.map((item) => {
          if (item.id === productID) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        setUserCart(updatedCart)
        updateServer(productID, quantity); // Update server
      };
    
      // Update cart on the server
      const updateServer = async (productID, quantity) => {
        setLoading(true);
        try {
          const token = Cookies.get("token");
          await axios.post(
            'http://localhost:3002/user/cart',
            {
              productID,
              quantity,
            },
            {
              headers: { token: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error(axiosErrorManager(error));
        } finally {
          setLoading(false);
        }
      };
    const calculateTotalPrice = () => {
        return userCart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-4 text-center">Cart</h2>
            
            {userCart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="hidden sm:table-header-group">
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left">Product Name</th>
                                <th className="py-2 px-4 text-left">Description</th>
                                <th className="py-2 px-4 text-left">Price</th>
                                <th className="py-2 px-4 text-left">Quantity</th>
                                <th className="py-2 px-4 text-left">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCart.map((product) => (
                                <tr key={product._id} className="border-t sm:table-row block mb-6 sm:mb-0">
                                    <td className="py-2 px-4 block sm:table-cell">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded mr-2" />
                                            <span className="font-semibold">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 block sm:table-cell">
                                        <span className="block sm:hidden font-semibold">Description: </span>{product.description}
                                    </td>
                                    <td className="py-2 px-4 block sm:table-cell">
                                        <span className="block sm:hidden font-semibold">Price: </span>${product.price.toFixed(2)}
                                    </td>
                                    <td className="py-2 px-4 block sm:table-cell">
                                        <span className="block sm:hidden font-semibold">Quantity: </span>
                                        <div className="flex items-center mt-2 sm:mt-0">
                                            <button
                                                onClick={() => updateCart(product._id, product.quantity-1)}
                                                className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-l"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={product.quantity}
                                                readOnly
                                                className="w-8 text-center border border-gray-300 mx-1"
                                            />
                                            <button
                                                onClick={() => updateCart(product._id,product.quantity+1)}
                                                className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-r"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 block sm:table-cell">
                                        <span className="block sm:hidden font-semibold">Remove: </span>
                                        <button
                                            onClick={() => removeFromCart(product._id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mt-2 sm:mt-0"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                   
                    <div className="mt-6 text-right">
                        <p className="text-xl font-bold">Total Price: ${calculateTotalPrice()}</p>
                        <NavLink to="/payment">
                            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full sm:w-auto">
                                Buy Now
                            </button>
                        </NavLink>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;