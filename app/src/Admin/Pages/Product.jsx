import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../../utilities/axiosInstance";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const itemsPerPage = 6;

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/admin/products",);
      setProducts(response.data.data);
      const uniqueCategories = [...new Set(response.data.data.map((product) => product.category))];
      setCategories([...uniqueCategories]);
      setLoading(false);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      let url = `/admin/products`;
      if (category) url = `/admin/products/category/${category}`;
      const response = await axiosInstance.get(url,);
      setProducts(response.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProductsByCategory();
  }, [category]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Products List</h1>
        <div className="flex items-center">
          <div className="relative mr-8">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border px-4 py-2 rounded"
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <NavLink to="/add">
            <button className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded">
              Add New Product
            </button>
          </NavLink>
        </div>
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
            {currentProducts.map((product) => (
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
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-l"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-r"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;




