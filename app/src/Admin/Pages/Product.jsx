import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Product = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Products List</h1>
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
              <tr key={product?.id} className="border-t border-gray-200 text-center">
                <td className="py-2 px-5">{product?.id}</td>
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
                  <NavLink to={`/edit/${product?.id}`}>
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
      <div className="mt-6 text-center">
        <NavLink to={'/add'}>
          <button className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded">
            Add New Product
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Product;