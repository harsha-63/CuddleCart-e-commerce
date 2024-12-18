

import { useNavigate } from "react-router-dom";



const StripeCancelPage = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleRetryPayment = () => {
    navigate("/checkout"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 shadow-lg rounded-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Payment Canceled</h2>
        <p className="text-gray-700">
          It seems you canceled the payment process. If you want to complete your order, you can try again.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={handleRetryPayment}
            className="px-6 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Retry Payment
          </button>
          <button
            onClick={handleGoToHome}
            className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripeCancelPage;
