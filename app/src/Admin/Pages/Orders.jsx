import { useState, useEffect } from 'react';
import axiosInstance from '../../../utilities/axiosInstance';

import { FaCheckCircle } from 'react-icons/fa'; // Importing a checkmark icon

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch orders function
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        

        const response = await axiosInstance.get('/admin/orders', );

        if (Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          throw new Error('Data is not in the expected format.');
        }
      } catch (error) {
        setError('Error fetching orders.');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchOrders();
  }, []);

  // Separate function to handle shipping status update
  const handleShippingStatusChange = async (orderId, status) => {
    try {
      
      await axiosInstance.patch( `/admin/orders/shipping/${orderId}`,{ shippingStatus: status },);
  
      // Update the state immutably
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, shippingStatus: status }  // Ensure we're creating a new object here
            : order
        )
      );
    } catch (error) {
      console.error('Error updating shipping status:', error);
    }
  };
  

  
  const handlePaymentStatusChange = async (orderId, status) => {
    try {

      await axiosInstance.patch(`/admin/orders/payment/${orderId}`, { paymentStatus: status },);
      const updatedOrdersResponse = await axiosInstance.get(`/admin/orders`, );

      if (Array.isArray(updatedOrdersResponse.data.data)) {
        setOrders(updatedOrdersResponse.data.data);
      } else {
        throw new Error('Data is not in the expected format.');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  // Loading and Error handling in UI
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className=" flex justify-center text-3xl font-serif mb-6">Orders</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Total Amount</th>
            <th className="px-4 py-2 border">Shipping Status</th>
            <th className="px-4 py-2 border">Payment Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-4 py-2 border">{order._id}</td>
              <td className="px-4 py-2 border">
                {order.products.map((product, index) => (
                  <div key={index}>
                    {product.productId.name}
                  </div>
                ))}
              </td>
              <td className="px-4 py-2 border">
                {order.products.map((product, index) => (
                  <img
                    key={index}
                    src={product.productId.image}
                    alt={product.productId.name}
                    className="w-16 h-16 object-cover"
                  />
                ))}
              </td>
              <td className="px-4 py-2 border">${order.totalAmount}</td>
              <td className="px-4 py-2 border">{order.shippingStatus}</td>
              <td className="px-4 py-2 border">{order.paymentStatus}</td>
              <td className="px-4 py-2 border">
                {/* Show a checkmark when both statuses are updated */}
                {order.shippingStatus === 'delivered' && order.paymentStatus === 'paid' ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <>
                    {/* Button for Mark as Shipped */}
                    {order.shippingStatus !== 'delivered' && (
                      <button
                        onClick={() => handleShippingStatusChange(order._id, 'delivered')}
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2 mb-4"
                      >
                        Mark as Shipped
                      </button>
                    )}

                    {/* Button for Mark as Paid */}
                    {order.paymentStatus !== 'paid' && (
                      <button
                        onClick={() => handlePaymentStatusChange(order._id, 'paid')}
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;







