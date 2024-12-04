import { useState, useEffect, useContext } from "react";
import babyImage from "../assets/baby1.jpg";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext"

const Home = () => {
  const { products } = useContext(ShopContext); // Access products from context
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter(
        (product) => product.newArrival === true
      );
      setNewArrivalProducts(filteredProducts);
    }
  }, [products]);

  return (
    <>
    
  <div className="h-screen flex items-center justify-between bg-white px-10 md:px-20">
  {/* Left Section - Text */}
  <div className="w-full md:w-1/2 text-left">
    <h1 className="text-4xl md:text-6xl font-extrabold leading-snug text-gray-800 tracking-wide">
      Welcome to <span className="text-amber-900">CuddleCart</span>
    </h1>
    <p className="text-lg md:text-2xl mt-4 text-gray-600">
      – Where Every Little Moment Matters!
    </p>
  </div>

  {/* Right Section - Image */}
  <div className="relative w-full md:w-1/2 flex justify-center items-center">
    <div className="w-80 h-80 md:w-96 md:h-96 bg-pink-100 rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-lg">
      <img
        src={babyImage}
        alt="Baby Products"
        className="w-full h-full object-cover scale-105"
      />
    </div>
  </div>
</div>


      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800">Categories</h3>
        <p className="text-gray-600 mt-2">
          Explore our wide range of baby products
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Category Links */}
        <Link
          to="/collection/Toys"
          className="flex flex-col items-center justify-center bg-pink-100 hover:bg-pink-200 p-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Toys"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Toys</h4>
        </Link>

        <Link
          to="/collection/Clothing"
          className="flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Clothes"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Clothes</h4>
        </Link>

        <Link
          to="/collection/Essentials"
          className="flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Essentials"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Essentials</h4>
        </Link>

        <Link
          to="/collection/Nursery"
          className="flex flex-col items-center justify-center bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Nursery"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Nursery</h4>
        </Link>

        <Link
          to="/collection/Travel"
          className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Travel"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Travel</h4>
        </Link>
        <Link
          to="/collection/Feeding"
          className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Travel"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Feeding</h4>
        </Link>
        <Link
          to="/collection/Safety"
          className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Travel"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Safety</h4>
        </Link>
        <Link
          to="/collection/Bath"
          className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Travel"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Bath</h4>
        </Link>
        <Link
          to="/collection/Protein"
          className="flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Travel"
              className="w-10 h-10"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Protein</h4>
        </Link>
      </div>

      {/* New Arrivals Section */}
      <div className="mt-12">
        <h3 className="text-3xl font-bold text-gray-800 text-center">
          New Arrivals
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 hover:">
          {newArrivalProducts.map((product) => (
            <NavLink
              key={product.id} to={`/product/${product.id}`}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105  transition-transform duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p className="text-pink-500 mt-2 font-bold">${product.price}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;


