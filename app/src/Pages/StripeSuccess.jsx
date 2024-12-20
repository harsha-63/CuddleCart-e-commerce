import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";


const StripeSuccessPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: true, success: false, message: "" });

  useEffect(() => {
    console.log("Session ID:", sessionId);
    const fetchOrderStatus = async () => {
        try {
          const response = await axiosInstance.put(
            `/user/order/stripe/success/${sessionId}`,
            {},
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
    <div className="flex flex-col items-center justify-center mt-32 mb-64 ">
      {status.success ? (
        <div className="bg-white p-10 shadow-lg rounded-md text-center">
          <h2 className="text-xl font-bold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-700">{status.message}</p>
          <button
            onClick={handleGoToHome}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <FontAwesomeIcon icon={faHome}/>
          </button>
        </div>
      ) : ( null
       
      )}
    </div>
  );
};

export default StripeSuccessPage;
