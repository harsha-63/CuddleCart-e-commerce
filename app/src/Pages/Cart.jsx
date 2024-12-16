import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import axiosErrorManager from '../../utilities/axiosErrorManager';  
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const { setLoading } = useContext(UserContext);
    const { userCart, setUserCart, removeFromCart } = useContext(CartContext);

    const updateCart = (productId, quantity) => {
        if (quantity < 1) return; 
        const updatedCart = userCart.map((item) => {
            if (item.productId._id === productId) {
                return { ...item, quantity };
            }
            return item;
        });
        setUserCart(updatedCart);
        updateServer(productId, quantity);
    };

    const updateServer = async (productId, quantity) => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            await axios.post(
                'http://localhost:3002/user/cart',
                {
                    productId,
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

    const calculateSubtotal = (price, quantity) => (price * quantity).toFixed(2);

    const calculateTotalPrice = () => {
        return Array.isArray(userCart) && userCart.reduce(
            (total, product) => total + product.productId.price * product.quantity, 
            0
        ).toFixed(2);
    };

    return (
        <div className="p-6 ">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>
        {userCart.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
            <div>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 text-sm font-bold">
                            <th className="py-3 px-4 text-left">Product</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Subtotal</th>
                            <th className="py-3 px-4 text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(userCart) && userCart.map((product, index) => (
                            product.productId && (
                                <tr key={index} className="border-t">
                                    <td className="py-4 px-4 flex items-center">
                                        <img
                                            src={product.productId.image}
                                            alt={product.productId.name}
                                            className="w-12 h-12 object-cover rounded mr-2"
                                        />
                                        <span className="font-semibold">{product.productId.name}</span>
                                    </td>
                                    <td className="py-4 px-4">${product.productId.price}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => updateCart(product.productId._id, product.quantity - 1)}
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
                                                onClick={() => updateCart(product.productId._id, product.quantity + 1)}
                                                className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-r"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">${calculateSubtotal(product.productId.price, product.quantity)}</td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => removeFromCart(product.productId._id)}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-xl font-bold text-gray-800 text-right">
                        Total Price: ${calculateTotalPrice()}
                    </p>
                    <NavLink to="/payment">
                        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full sm:w-auto ">
                            Proceed to Payment
                        </button>
                    </NavLink>
                </div>
            </div>
        )}
    </div>
    
    );
};

export default Cart;
