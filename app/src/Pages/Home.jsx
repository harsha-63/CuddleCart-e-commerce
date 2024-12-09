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
    
    <div className="h-screen md:h-auto sm:h-auto flex items-center justify-between bg-white px-10 md:px-5 sm:mt-16 sm:mb-20 relative">
      <div className="absolute left-0 z-10 text-left w-full md:w-1/2 ml-36 mb-36">
        <h1 className="text-5xl md:text-5xl font-bold font-serif text-gray-800 ">
          Tiny Comforts, Big Smiles 
        </h1>
        <p className=" mt-4 text-black">
          Discover the softest,adorable baby essentials <p> that your little one will love.</p>
        </p>
        <Link to={'/collection'}>
            <button className="font-sans text-white bg-amber-800 px-4 py-2 rounded-lg mt-5 flex items-center">
                  Shop Now <span className="ml-2">&#8594;</span>
            </button>
        </Link>
    </div>
    <div className="w-full md:w-full flex justify-center items-center overflow-hidden rounded-3xl">
      <img
        src={babyImage}
        alt="Baby Products"
        className="w-[2000px] h-[550px] object-cover scale-105"/>
    </div>
  </div>



  <div className="text-center mb-8">
    <h3 className="text-3xl font-bold text-gray-800">Categories</h3>
    <p className="text-gray-600 mt-2">
      Explore our wide range of baby products
    </p>
  </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
      <Link
        to="/collection/Toys"
        className="flex flex-col items-center justify-center bg-cover bg-center p-2 rounded-lg shadow-md transition-transform transform hover:scale-105 h-96  "
        style={{ backgroundImage: 'url(https://i.pinimg.com/736x/77/69/aa/7769aaac9fe0781943a8431e0208a289.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <h4 className=" font-script font-normal text-black text-3xl p-2 rounded"style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Toys</h4>
      </Link>
      
      <Link
        to="/collection/Clothing"
        className="flex flex-col items-center justify-center bg-cover bg-center p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-96 "
        style={{ backgroundImage: 'url(https://i.pinimg.com/736x/42/d9/69/42d96970eb999e5976e67c366f0a7257.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <h4 className="text-3xl font-script font-normal text-black  p-2 rounded"style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Clothes</h4>
      </Link>
      
      <Link
        to="/collection/Nursery"
        className="flex flex-col items-center justify-center bg-cover bg-center p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-96 "
        style={{ backgroundImage: 'url(https://i.pinimg.com/736x/95/60/2a/95602ac389bd5de7277fa21344a6cf14.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <h4 className="text-3xl font-script font-normal text-black p-2 rounded"style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Nursery</h4>
      </Link>
      
      <Link
        to="/collection/Feeding"
        className="flex flex-col items-center justify-center bg-cover bg-center p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-96 "
        style={{ backgroundImage: 'url(https://i.pinimg.com/736x/cd/dd/12/cddd123eb8c006b78e8a78b8501ad8b5.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <h4 className="text-3xl font-script font-normal text-black p-2 rounded"style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Feeding</h4>
      </Link>
    </div>
    <div className="flex justify-center">
      <br></br>
      <Link to={'/collection'}>
        <button className="font-sans text-white bg-amber-800 px-4 py-2 rounded-lg mt-10 flex items-center ">
          Show More <span className="ml-2">&#8594;</span>
        </button>
      </Link>
    </div>


    {/* New Arrivals Section */}
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-gray-800 text-center">
        New Arrivals
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 hover:">
        {newArrivalProducts.map((product) => (
          <NavLink
            key={product._id} to={`/product/${product._id}`}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105  transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className="text-black mt-2 font-bold">${product.price}</p>
          </NavLink>
        ))}
      </div>
      </div>
    </>
  );
};

export default Home;


