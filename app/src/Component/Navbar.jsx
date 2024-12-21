import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars, faSearch, faSignIn, faHeart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';

const Navbar = () => {
  const { userCart } = useContext(CartContext);
  const { currentUser, isAdmin } = useContext(UserContext);
  const { setShowSearch } = useContext(ShopContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative pt-8 pb-5">
      <div className="flex justify-between items-center w-full px-4 sm:px-8">
        <NavLink to='/' className="font-atma text-2xl sm:text-4xl font-semibold text-amber-950">Cuddle Cart</NavLink>
        <nav className="hidden sm:flex items-center gap-6 text-base">
          <NavLink to="/" className="hover:text-amber-800 text-black transition">Home</NavLink>
          <NavLink to="/collection" className="hover:text-amber-800 text-black transition">Collection</NavLink>
          <NavLink to="/about" className="hover:text-amber-800 text-black transition">About</NavLink>
          <NavLink to="/contact" className="hover:text-amber-800 text-black transition">Contact</NavLink>
          {currentUser && isAdmin ? (
            <NavLink to="/dashboard" className="hover:text-amber-800 text-black transition">Admin</NavLink>
          ) : null}
        </nav>

        <div className="hidden sm:flex items-center gap-6">
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
                  <span className="absolute right-0 bottom-0 w-3 h-3 flex items-center justify-center bg-red-500 text-white rounded-full text-[8px]">
                    {userCart.length}
                  </span>
                )}
              </NavLink>
              <NavLink to="/wishlist" className="hover:text-gray-800">
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
              <button className="text-base hover:text-amber-800 transition">
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
        <div className="sm:hidden bg-gray-100 flex flex-col items-center gap-4 text-lg text-gray-600 p-4 w-full absolute top-16 left-0 z-50">
          <NavLink to="/" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Home</NavLink>
          <NavLink to="/collection" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Collection</NavLink>
          <NavLink to="/about" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">About</NavLink>
          <NavLink to="/contact" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Contact</NavLink>
          {currentUser && isAdmin && (
            <NavLink to="/dashboard" onClick={toggleMobileMenu} className="hover:text-gray-800 transition">Admin</NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;


