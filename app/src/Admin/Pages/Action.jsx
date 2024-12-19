import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../utilities/axiosInstance";
import axiosErrorManager from "../../../utilities/axiosErrorManager";



const Action = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
       

        const response = await axiosInstance.get(`/admin/user/${id}`,);

        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user by ID:", err);
        setError("Failed to fetch user details. Please try again later.");
      }
    };

    const fetchUserOrders = async () => {
      try {
       

        const response = await axiosInstance.get(
          `/admin/orders/${id}`,);

        setOrders(response.data.data || []); 
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserById();
      fetchUserOrders();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const blockUser = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/users/block/${id}`,
        {},
      );

      setUser(response.data.user);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    
    <div className="container">
      
      {/* First Row: Profile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-14 ">
        {/* First Column: Profile Picture */}
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faUser} size="4x" />
        </div>
  
        {/* Second Column: User Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">Name: {user.name}</h2>
          <h3 className="text-lg mb-2">Email: {user.email}</h3>
          <h3 className="text-lg font-semibold mb-2">
            Role: <span className="ml-2">{user.isAdmin ? "Admin" : "User"}</span>
          </h3>
  
          {/* Block/Unblock Button */}
          <div className="flex justify-start">
            <button
              onClick={() => blockUser(user._id)}
              className={`${
                user.isBlock ? "bg-green-500" : "bg-red-500"
              } py-2 px-4 rounded-lg`}
            >
              {user.isBlock ? "Unblock" : "Block"}
            </button>
          </div>
        </div>
      </div>
  
      {/* Second Row: Orders */}
      <div className="container mx-auto px-6 py-10">
  <h2 className="font-serif text-3xl font-semibold text-gray-800 mb-8 mt-9">Orders</h2>
  {orders && orders.length > 0 ? (
    <div className="grid gap-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Order ID: {order._id}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Products */}
            <div className="space-y-4">
              {order.products && order.products.length > 0 ? (
                order.products.map((product) => (
                  <div
                    key={product.productId._id}
                    className="border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col items-center bg-gray-50"
                  >
                    <img
                      src={product.productId.image}
                      alt={product.productId.name}
                      className="w-24 h-24 object-cover rounded-lg mb-3"
                    />
                    <p className="text-lg font-medium text-gray-700 mb-2">{product.productId.name}</p>
                    <p className="text-sm text-gray-600">${product.productId.price}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No products available</p>
              )}
            </div>
            {/* Column 2: Order Details */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm p-6 ">
              <div className="space-y-3">
                <p className="text-base font-semibold text-gray-700">
                  <span className="font-medium">Total Amount:</span> ${order.totalAmount}
                </p>
                <p className="text-base font-semibold text-gray-700">
                  <span className="font-medium">Shipping Status:</span> {order.shippingStatus}
                </p>
                <p className="text-base font-semibold text-gray-700">
                  <span className="font-medium">Payment Status:</span> {order.paymentStatus}
                </p>
                <p className="text-base font-semibold text-gray-700">
                  <span className="font-medium">Purchase Date:</span> {order.purchaseDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500  text-xl flex justify-center">No orders yet</p>
  )}
</div>

    </div>

  
  )
}
export default Action


