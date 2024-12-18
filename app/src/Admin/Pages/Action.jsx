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
    <div className="container mx-auto ">
      <div className="grid grid-rows-3 gap-2 bg-white shadow-lg rounded-lg ">
        <div className="grid grid-cols-2 gap-4 mb-20">
          <div className="flex justify-center items-center ">
            <FontAwesomeIcon icon={faUser} size="6x" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-2">Name: {user.name}</h2>
            <h3 className="text-lg mb-2">Email: {user.email}</h3>
            <h3 className="text-lg font-semibold mb-2">
              Role:{" "}
              <span className="ml-2">{user.isAdmin ? "Admin" : "User"}</span>
            </h3>
            <div className="">
              <button
                onClick={() => blockUser(user._id)}
                className={`${
                  user.isBlock ? "bg-red-500" : "bg-green-500"
                } py-2 px-4 rounded-lg mr-96 ml-6 `}
              >
                {user.isBlock ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <h2 className="px-5 mb-8 font-serif text-3xl">Orders</h2>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg px-5 pb-5"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Order ID: {order._id}
                </h2>

                <table className="min-w-full bg-white border border-gray-300 rounded">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 text-left">Product Name</th>
                      <th className="py-2 px-4 text-left">Price</th>
                      <th className="py-2 px-4 text-left">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products && order.products.length > 0 ? (
                      order.products.map((product) => (
                        <tr
                          key={product.productId._id}
                          className="border-t"
                        >
                          <td className="py-2 px-4">
                            {product.productId.name}
                          </td>
                          <td className="py-2 px-4">
                            ${product.productId.price}
                          </td>
                          <td className="py-2 px-4">
                            <img
                              src={product.productId.image}
                              alt={product.productId.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="py-2 px-4 text-center"
                        >
                          No products available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="mt-4">
                  <p className="text-base font-semibold">
                    Total Amount: ${order.totalAmount}
                  </p>
                  <p className="text-base font-semibold">
                    Shipping Status: {order.shippingStatus}
                  </p>
                  <p className="text-base font-semibold">
                    Payment Status: {order.paymentStatus}
                  </p>
                  <p className="text-base font-semibold">
                    Payment Method: {order.paymentMethod}
                  </p>
                  <div className="mt-2">
                    <p className="font-medium">User Details:</p>
                    <p>Name: {order.userDetails.name}</p>
                    <p>Phone: {order.userDetails.phone}</p>
                    <p>Address: {order.userDetails.address}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Action;


