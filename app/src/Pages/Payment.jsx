import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { setUserOrder, setUserCart, userCart, patchUpdatedCart, } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    address: '',
    phonenumber: '',
    state: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert('Payment was successful!');
    setUserOrder((prev) => [...prev, ...userCart]);
    await patchUpdatedCart([]);
    setUserCart([]);
    navigate('/');
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
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={deliveryDetails.fullName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={deliveryDetails.address}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            <div>
              <label htmlFor="phonenumber" className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                id="phonenumber"
                name="phonenumber"
                value={deliveryDetails.phonenumber}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={deliveryDetails.state}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={deliveryDetails.postalCode}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300"
                required
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 focus:ring focus:ring-indigo-300"
              />
              Credit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 focus:ring focus:ring-indigo-300"
              />
              PayPal
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Gpay"
                checked={paymentMethod === 'Gpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 focus:ring focus:ring-indigo-300"
              />
              Gpay
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