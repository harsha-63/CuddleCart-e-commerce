import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get("http://localhost:3002/admin/products", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log(response);
        
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-left mb-6">Products List</h1>

        <NavLink to={"/add"}>
          <button className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded mb- text-right">
            Add New Product
          </button>
        </NavLink>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-center text-gray-700 uppercase font-semibold">ID</th>
              <th className="py-3 px-5 text-center text-gray-700 uppercase font-semibold">Image</th>
              <th className="py-3 px-5 text-center text-gray-700 uppercase font-semibold">Name</th>
              <th className="py-3 px-5 text-center text-gray-700 uppercase font-semibold">Price</th>
              <th className="py-3 px-5 text-center text-gray-700 uppercase font-semibold">Category</th>
              <th className="py-3 px-5 text-center text-gray-700 uppercase font-semibold">Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product?._id} className="border-t border-gray-200 text-center">
                <td className="py-2 px-5">{product?._id}</td>
                <td className="py-2">
                  <img
                    src={product?.image}
                    alt="Product"
                    className="w-12 h-12 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="py-2 px-5">{product?.name}</td>
                <td className="py-2 px-5">${product?.price}</td>
                <td className="py-2 px-5">{product?.category}</td>
                <td className="py-2 px-5">
                  <NavLink to={`/edit/${product?._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
                      Edit
                    </button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
