
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from "axios"
import Cookies from 'js-cookie'
import axiosErrorManager from "../../../utilities/axiosErrorManager";

const Action = () => {
   
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserById = async () => {
          try {
            const token = Cookies.get("token");
            if (!token) {
              throw new Error("Token not found");
            }
    
            const response = await axios.get(`http://localhost:3002/admin/user/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token
              },
            });
            console.log(response.data.user);
            
            setUser(response.data.user);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching user by ID:", err);
            setError("Failed to fetch user details. Please try again later.");
            setLoading(false);
          }
        };
    
        if (id) {
          fetchUserById();
        }
      }, [id]);

    useEffect(() => {
        if (user) {
            setIsBlocked(user.isBlock);
        }
    }, [user]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>No user found.</p>;

    const UserRole = async () => {
        if (user) {
            const updatedUser = { ...user, isAdmin: !user.isAdmin };

            try {
                await axios.patch(`http://localhost:4000/user/${user.id}`, { isAdmin: updatedUser.isAdmin });
                setUser(updatedUser);
                toast(`User role changed to ${updatedUser.isAdmin ? "Admin" : "User"}`);
            } catch (error) {
                console.error("Failed to update user role:", error);
            }
        }
    };

   

const blockUser = async (id) => {
    setLoading(true);
    try {
        // Retrieve the token from cookies
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await axios.patch(
            `http://localhost:3002/admin/users/block/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        console.log(response.data);
        
        setUser(response.data.user);
        toast.success(response.data.message);
    } catch (err) {
        toast.error(axiosErrorManager(err));
    } finally {
        setLoading(false);
    }
};


    if (!user) {
        return <div>Loading user information...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-rows-3 gap-2 bg-white shadow-lg rounded-lg p-2">
                <div className="grid grid-cols-2 gap-4"> 
                    <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faUser} size="8x" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold mb-2">Name: {user.name}</h2>
                        <h3 className="text-lg mb-2">Email: {user.email}</h3>
                        <h3 className="text-lg font-semibold mb-2">Role: 
                            <span className="ml-2">{user.isAdmin ? "Admin" : "User"}</span>
                        </h3>
                    </div>
                </div>
                {/* <div>
                    <h3 className="text-xl font-semibold mb-2">Orders:</h3>
                    {user.order.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-300 rounded">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 text-left">Product Name</th>
                                    <th className="py-2 px-4 text-left">Quantity</th>
                                    <th className="py-2 px-4 text-left">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.order.map((product) => (
                                    <tr key={product?.id} className="border-t">
                                        <td className="py-2 px-4 flex items-center">
                                            <img
                                                src={product?.image}
                                                alt={product?.name}
                                                className="w-12 h-12 object-cover rounded mr-2"
                                            />
                                            {product?.name}
                                        </td>
                                        <td className="py-2 px-4">{product?.quantity}</td>
                                        <td className="py-2 px-4">${product?.price?.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No orders found for this user.</p>
                    )}
                </div> */}

                
                <div className="flex justify-center gap-4 h-10">
                    <button
                        onClick={UserRole}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Change Role to {user.isAdmin ? "User" : "Admin"}
                    </button>

                    <button
                        onClick={() => blockUser(user._id)}
                        // Properly disable the button
                        className={`${
                            user.isBlock ? "bg-red-500" : "bg-green-500"
                        } py-2 px-4 rounded-lg `}
                    >
                        {user.isBlock ? "Unblock" : "Block"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Action;