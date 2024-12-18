import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'

const StripeSuccessPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: true, success: false, message: "" });

  useEffect(() => {
    console.log("Session ID:", sessionId);
    const fetchOrderStatus = async () => {
        try {
          const token = Cookies.get('token');
          if (!token) {
            toast.error('You must be logged in to place an order.');
            return;
          }
      
          const response = await axios.put(
            `http://localhost:3002/user/order/stripe/success/${sessionId}`,
            {}, // Request body, if empty, should still be provided
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("API Response:", response.data);
          setStatus({ loading: false, success: true, message: response.data.message });
        } catch (error) {
          console.error("Error fetching order status:", error);
          setStatus({
            loading: false,
            success: false,
            message: error.response?.data?.message || "Something went wrong.",
          });
        }
      };
  
    if (sessionId) {
      fetchOrderStatus();
    }
  }, [sessionId]);
  

  const handleGoToHome = () => {
    navigate("/");
  };

  if (status.loading) {
    return <div className="text-center mt-10">Processing your order...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      {status.success ? (
        <div className="bg-white p-8 shadow-lg rounded-md text-center">
          <h2 className="text-xl font-bold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-700">{status.message}</p>
          <button
            onClick={handleGoToHome}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 shadow-lg rounded-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Payment Failed</h2>
          <p className="text-gray-700">{status.message}</p>
          <button
            onClick={handleGoToHome}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default StripeSuccessPage;
