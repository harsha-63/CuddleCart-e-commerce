import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const Order = () => {
  const { userOrder } = useContext(CartContext);

  return (
    <>
      <h1 className="text-center text-4xl font-semibold my-4">YOUR ORDERS</h1>
      <br />
      {userOrder.length > 0 ? (
        <div className="grid grid-row-1 sm:grid-rows-2 lg:grid-cols-3 gap-6">
          {userOrder.map((product) => (
            <div
              key={product?.id}
              className="border p-4 rounded shadow hover:shadow-xl w-full flex flex-row sm:flex-row justify-between gap-4"
            >
              <div className="w-full sm:w-1/2">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col justify-center">
                <ul>
                  <div className="text-start">
                    <h2 className="text-lg font-semibold">Product: {product?.name}</h2>
                    <p className="text-gray-700 font-semibold">Description: {product?.description}</p>
                    <p className="text-gray-700 font-semibold">Price: ${product?.price.toFixed(2)}</p>
                    <p className="text-gray-700 font-semibold">Quantity: {product?.quantity}</p>
                  </div>
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </>
  );
};

export default Order;