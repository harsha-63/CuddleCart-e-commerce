import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars, faSearch, faSignIn, faHeart } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';

const Navbar = () => {
  const { userCart } = useContext(CartContext);
  const { currentUser,isAdmin } = useContext(UserContext);
  const { setShowSearch } = useContext(ShopContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    console.log("Mobile Menu Toggled", !isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative pt-8 pb-5">

      <div className="flex flex-grow justify-between items-center w-full ">
        <NavLink to='/' className="font-atma text-4xl font-semibold text-amber-950 ml-8">Cuddle Cart</NavLink>
        <nav className="hidden sm:flex items-center gap-12 text-base ml-0">
          <NavLink to="/" className="hover:text-amber-800  text-black transition">Home</NavLink>
          <NavLink to="/collection" className="hover:text-amber-800 text-black transition">Collection</NavLink>
          <NavLink to="/about" className="hover:text-amber-800 text-black transition">About</NavLink>
          <NavLink to="/contact" className="hover:text-amber-800 text-black transition">Contact</NavLink>
          {currentUser && isAdmin ? (
            <NavLink to="/dashbord" className="hover:text-amber-800 text-black transition">Admin</NavLink>
          ) : null}
        </nav>

        <div className="sm:flex items-center gap-6  mr-12">
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="cursor-pointer hover:text-gray-800 transition"
            onClick={() => setShowSearch(true)}
          />

          {currentUser && (
            <>
            <NavLink to="/cart" className="hover:text-gray-800 relative">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {userCart.length > 0 && (
                <p className="absolute right-0 bottom-0 w-3 h-3 flex items-center justify-center bg-red-500 text-white rounded-full text-[8px]">
                  {userCart.length}
                </p>
              )}
            </NavLink>
            <NavLink to="/wishlist" className="hover:text-gray-800 relative">
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </NavLink>
            </>
          )}

          {currentUser ? (
            <NavLink to="/user" className="hover:text-gray-800 transition">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button className="text-base hover:text-amber-800 transition mr-3">
                Log in <FontAwesomeIcon icon={faSignIn} />
              </button>
            </NavLink>
          )}
        </div>

      <button
      onClick={toggleMobileMenu}
      className="block sm:hidden text-gray-600 focus:outline-none p-2"
      aria-label="Toggle mobile menu"
    >
      <FontAwesomeIcon icon={faBars} size="lg" />
    </button>

      </div>

      {isMobileMenuOpen && (
  <div
    className="sm:hidden bg-gray-100 flex flex-col items-center justify-center gap-4 text-lg text-gray-600 p-4 w-full z-50 absolute top-0 left-0"
    style={{ zIndex: 1000 }} // Make sure the menu is on top of other content
  >
    <NavLink to="/" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Home</NavLink>
    <NavLink to="/collection" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Collection</NavLink>
    <NavLink to="/about" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">About</NavLink>
    <NavLink to="/contact" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Contact</NavLink>
    {currentUser && currentUser.isAdmin && (
      <NavLink to="/admin" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Admin</NavLink>
    )}
  </div>
)}

    </header>
  );
};

export default Navbar;

