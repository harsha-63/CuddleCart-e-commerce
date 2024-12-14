import { useContext, useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import icons
import { UserContext } from "../Context/UserContext";
import { WishlistContext } from "../Context/WishlistContext";

const Collection = () => {
  const { products, showSearch, search } = useContext(ShopContext);
  const { currentUser } = useContext(UserContext);
  const { addToWishlist, userWishlist } = useContext(WishlistContext);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  const filteredProducts = () => {
    let filtered = products || [];

    // Filter for search term
    if (showSearch && search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  };
  useEffect(() => {
    window.scrollTo(0,0);
 }, []); 

  // Paginated Products
  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts().slice(startIndex, endIndex);
  };

  // Total Pages
  const totalPages = Math.ceil(filteredProducts().length / productsPerPage);

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-row gap-10 sm:flex-row justify-center mb-6 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl mb-4 sm:mb-0 text-center font-serif">
            Collections
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedProducts().map((product) => (
          <NavLink
            key={product._id}
            to={`/product/${product._id}`}
            className="flex flex-col relative"
          >
            <div className="border p-4 rounded shadow hover:shadow-xl flex flex-col justify-between w-full h-full transition duration-300 ease-in-out">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-bold truncate">{product.name}</h2>
              <p className="text-gray-700 mt-1">${product.price.toFixed(2)}</p>

              {/* Toggled Wishlist Icon */}
              {currentUser && (
                <div
                  onClick={() => handleAddToWishlist(product)}
                  className="absolute bottom-4 right-4 cursor-pointer text-red-500"
                >
                  {userWishlist.some((item) => item._id === product._id) ? (
                    <FaHeart size={18} />
                  ) : (
                    <FaRegHeart size={18} />
                  )}
                </div>
              )}
            </div>
          </NavLink>
        ))}
      </div>

     {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="flex justify-center mt-8">
    <button
      onClick={() => {
        setCurrentPage((prev) => {
          const newPage = Math.max(prev - 1, 1);
          if (newPage !== prev) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return newPage;
        });
      }}
      disabled={currentPage === 1}
      className={`px-4 py-2 mx-1 border rounded ${
        currentPage === 1 ? "bg-gray-300" : "bg-white hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => {
          setCurrentPage(index + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`px-4 py-2 mx-1 border rounded ${
          currentPage === index + 1
            ? "bg-amber-800 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => {
        setCurrentPage((prev) => {
          const newPage = Math.min(prev + 1, totalPages);
          if (newPage !== prev) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return newPage;
        });
      }}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 mx-1 border rounded ${
        currentPage === totalPages
          ? "bg-gray-300"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
)}

      
    </>
  );
};

export default Collection;





