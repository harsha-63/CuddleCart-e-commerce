import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const PaymentPage = () => {
  const { setUserOrder, setUserCart, userCart, calculateTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    mobile: '',
    state: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = calculateTotalPrice(); 
    const userDetails = { ...deliveryDetails };

    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('You must be logged in to place an order.');
        return;
      }

      if (paymentMethod === 'cash on delivery') {
        // Cash on Delivery Logic
        await axios.post(
          'http://localhost:3002/user/order/cod',
          { userDetails, totalAmount },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        toast.success('Order placed successfully for Cash on Delivery!');
        setUserOrder((prev) => [...prev, ...userCart]);
       
        setUserCart([]);
        navigate('/');
      } else if (paymentMethod === 'card') {
        // Stripe Payment Logic
        const response = await axios.post(
          'http://localhost:3002/user/order/stripe',
          { userDetails, totalAmount },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const { stripeUrl } = response.data;
        window.location.href = stripeUrl; 
      }
    } catch (error) {
      console.error(error);
      toast.error('Error processing your order. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Delivery Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {['name', 'address', 'mobile', 'state', 'postalCode'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={deliveryDetails[field]}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cash on delivery"
                checked={paymentMethod === 'cash on delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 focus:ring focus:ring-indigo-300"
              />
              Cash on Delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 focus:ring focus:ring-indigo-300"
              />
              Card (Stripe)
            </label>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-red-300 text-white py-3 px-6 rounded-md hover:bg-red-300 transition duration-300"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;

