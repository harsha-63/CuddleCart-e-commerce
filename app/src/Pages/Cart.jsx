import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const Cart = () => {
    const { userCart, removeFromCart,calculateTotalPrice,calculateSubtotal,updateCart } = useContext(CartContext);
    return (
        <div className="p-6 ">
        <h2 className="text-4xl font-serif mb-6 text-center text-gray-800">Your Cart</h2>
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
                            <th className="py-3 px-4 text-left">Remove</th>
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
                                    <td className="py-4 px-4 ">
                                        <button
                                            onClick={() => removeFromCart(product.productId._id)}
                                            className="text-gray-500 hover:text-red-600 ml-5"
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
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-gray-800">
                            Total Price: ${calculateTotalPrice()}
                        </p>
                        <NavLink to="/payment">
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                Proceed to Payment
                            </button>
                        </NavLink>
                    </div>
                </div>

            </div>
        )}
    </div>
    
    );
};

export default Cart;
