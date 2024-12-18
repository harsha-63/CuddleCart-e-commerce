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
        <div className="overflow-x-auto">
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
                      <td colSpan="3" className="py-6 px-4">
                        <div className="border p-4 rounded shadow-lg mt-4">
                          <div className="text-start">
                            <p className="text-gray-700 font-semibold">
                              User: {order.userDetails?.name}
                              <br />
                              {order.userDetails?.phone}
                              <br />
                              {order.userDetails?.address}
                            </p>
                            <p className="text-gray-700 font-semibold">
                              Shipping Status: {order.shippingStatus}
                            </p>
                            <p className="text-gray-700 font-semibold">
                              Payment Status: {order.paymentStatus}
                            </p>
                            <p className="text-gray-700 font-semibold">
                              Total Amount: ${order.totalAmount}
                            </p>

                            <h3 className="text-lg font-semibold mt-4">Products:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {order.products.map((item) => (
                                <div
                                  key={item.productId?._id}
                                  className="border p-4 rounded-lg flex flex-col justify-between"
                                >
                                  {item.productId ? (
                                    <>
                                      <h2 className="text-lg font-semibold">
                                        Product: {item.productId?.name}
                                      </h2>
                                      <p className="text-gray-700 font-semibold">
                                        Description: {item.productId?.description}
                                      </p>
                                      <p className="text-gray-700 font-semibold">
                                        Price: ${item.productId?.price}
                                      </p>
                                      <p className="text-gray-700 font-semibold">
                                        Quantity: {item.quantity}
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-red-500">
                                      Product details not available
                                    </p>
                                  )}
                                  {item.productId?.image && (
                                    <div className="mt-4">
                                      <img
                                        src={item.productId?.image}
                                        width={140}
                                        alt={item.productId?.name}
                                        className="object-cover rounded"
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Cancel Order Button */}
                          {(order.shippingStatus !== "delivered" && order.shippingStatus !== "cancelled") &&
                          (order.paymentStatus !== "paid" && order.paymentStatus !== "cancelled") && (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-700"
                            >
                              Cancel Order
                            </button>
                          )}

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








