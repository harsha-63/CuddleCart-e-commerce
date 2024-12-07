import { NavLink, useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const CategoryPage = () => {
  const { category } = useParams(); 
  const { products } = useContext(ShopContext); 

  // Filter products by category
  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{category} Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <NavLink to={`/product/${product._id}`} key={product._id} className="border rounded-lg shadow-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
