import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars, faSearch, faSignIn } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';

const Navbar = () => {
  const { userCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const { setShowSearch } = useContext(ShopContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto p-4">
        <NavLink to={'/'}>
          <img src={logo} className="w-20 sm:w-28 lg:w-40" alt="Logo" />
        </NavLink>

        <nav className="hidden sm:flex gap-6 text-lg text-gray-600">
          <NavLink to="/" className="hover:text-gray-800 transition">Home</NavLink>
          <NavLink to="/collection" className="hover:text-gray-800 transition">Collection</NavLink>
          <NavLink to="/about" className="hover:text-gray-800 transition">About</NavLink>
          <NavLink to="/contact" className="hover:text-gray-800 transition">Contact</NavLink>
          {currentUser && currentUser.isAdmin ? (
            <NavLink to="/admin" className="hover:text-gray-800 transition">Admin</NavLink>
          ) : null}
        </nav>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="cursor-pointer hover:text-gray-800 transition"
            onClick={() => setShowSearch(true)}
          />

          {currentUser && (
            <NavLink to="/cart" className="hover:text-gray-800 relative">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {userCart.length > 0 && (
                <p className="absolute right-0 bottom-0 w-3 h-3 flex items-center justify-center bg-red-500 text-white rounded-full text-[8px]">
                  {userCart.length}
                </p>
              )}
            </NavLink>
          )}

          {currentUser ? (
            <NavLink to="/user" className="hover:text-gray-800 transition">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button className="text-lg hover:text-gray-800 transition">
                Log in <FontAwesomeIcon icon={faSignIn} />
              </button>
            </NavLink>
          )}
        </div>

        <button
          onClick={toggleMobileMenu}
          className="block sm:hidden text-gray-600 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-100 flex flex-col items-center justify-center gap-4 text-lg text-gray-600 p-4 w-full">
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

