import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utilities/axiosInstance";

const Order = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/user/order", );

        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          
          setUserOrders(response.data);
        } else {
          setUserOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleToggleDetails = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axiosInstance.patch(
        `/user/order/cancel/${orderId}`,
        {},
      );
      toast.success(response.data.message);
      setUserOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, shippingStatus: "cancelled", paymentStatus: "cancelled" }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading your orders...</p>;
  }

  return (
    <>
      <h1 className="text-center text-3xl font-serif my-4">YOUR ORDERS</h1>
      <br />
      {userOrders.length > 0 ? (
        <div className="overflow-x-auto px-52">
          <table className="min-w-full table-auto">
            <tbody>
              {userOrders.map((order) => (
                <>
                  <tr
                    className="shadow-lg hover:shadow-xl transition-all duration-300 my-10"
                    key={order._id}
                  >
                    <td className="py-2 px-4">
                      <span className="font-semibold">Order ID: </span>
                      {order._id}
                    </td>
                    <td className="py-2 px-4 flex space-x-4">
                      {order.products &&
                        order.products.length > 0 &&
                        order.products.map(
                          (item) =>
                            item.productId?.image && (
                              <img
                                key={item.productId._id}
                                src={item.productId?.image}
                                width={50}
                                alt={item.productId?.name}
                                className="object-cover rounded"
                              />
                            )
                        )}
                    </td>
                    <td className="py-2 px-4">
                      <span className="font-semibold">Total Amount: </span>${order.totalAmount}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleToggleDetails(order._id)}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        {expandedOrderId === order._id ? "Hide Details" : "Order Details"}
                      </button>
                    </td>
                  </tr>

                  {expandedOrderId === order._id && (
  <tr className="border-b">
    <td colSpan="3" className="py-6 px-2">
      <div className="bg-white border rounded-lg shadow-lg p-6 mt-4 ml-44">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* First Column: Products */}
          <div className="space-y-4">
           
            
              {order.products.map((item) => (
                <div
                  key={item.productId?._id}
                  className="border p-4 rounded-lg shadow-md bg-gray-50 flex items-center space-x-4"
                >
                  {/* Product Image */}
                  {item.productId?.image && (
                    <div className="w-24 h-18">
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.name}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{item.productId?.name}</h2>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
          
          </div>

          {/* Second Column: Order Details and Cancel Button */}
          <div className="space-y-4">
            <p className="text-gray-800 font-semibold text-lg">
              <span className="block"> {order.userDetails?.name}</span>
              <span className="block">{order.userDetails?.phone}</span>
              <span className="block">{order.userDetails?.address}</span>
            </p>
            <div className="space-y-2">
             
              <p
                className={`font-semibold ${
                  order.shippingStatus === "delivered" ? "text-green-500" : "text-red-500"
                }`}
              >
                Shipping Status: {order.shippingStatus}
              </p>

             
              <p
                className={`font-semibold ${
                  order.paymentStatus === "paid" ? "text-green-500" : "text-red-500"
                }`}
              >
                Payment Status: {order.paymentStatus}
              </p>

              <p className="font-semibold text-gray-700">
                Total Amount: <span className="font-bold">${order.totalAmount}</span>
              </p>

              {/* Purchase Date */}
              <p className="font-semibold text-gray-700">
                Purchase Date: <span className="font-bold">{order.purchaseDate}</span>
              </p>
            </div>

            {/* Cancel Order Button */}
            {(order.shippingStatus !== "delivered" && order.shippingStatus !== "cancelled") &&
              (order.paymentStatus !== "paid" && order.paymentStatus !== "cancelled") && (
                <div className="mt-6">
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="bg-red-500 text-white py-2 px-6 rounded-lg w-full hover:bg-red-700 transition-colors duration-200"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </td>
  </tr>
)}

                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </>
  );
};

export default Order;








