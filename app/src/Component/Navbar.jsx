import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart,faBars, faSearch, faSignIn } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';

const Navbar = () => {
  const {userCart}=useContext(CartContext)
  const {currentUser}=useContext(UserContext)
  const {setShowSearch}=useContext(ShopContext)

  return (
    <header className="pb-4 bg-white shadow-mb">
      <div className="flex justify-between items-center font-serif">
        <NavLink to={'/'}><img src={logo} className="w-20 sm:w-28 lg:w-40" alt="Logo" /></NavLink>
        <nav className="hidden sm:flex gap-5 text-sm text-gray-600">
          <NavLink to="/" className="flex flex-col items-center gap-1 hover:shadow-lg">Home</NavLink>
          <NavLink to="/shop" className="hover:shadow-lg flex flex-col items-center gap-1">Shop</NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1 hover:shadow-lg">About</NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:shadow-lg">Contact</NavLink>
          {currentUser&&currentUser.isAdmin?(
            <NavLink to="/admin" className="flex flex-col items-center gap-1 hover:shadow-lg">Admin</NavLink>
            ):null}
        </nav>
        <div className="flex items-center space-x-4 sm:space-x-10">
        <NavLink  to={'/shop'}className="hover:text-gray-400">
            <FontAwesomeIcon icon={faSearch} size="lg" onClick={()=>setShowSearch(true)} />
          </NavLink>
          <NavLink to="/cart" className="hover:text-gray-400 relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {currentUser ? (
              userCart.length > 0 && (
              <p className="absolute right-0 bottom-0 w-3 h-3 flex items-center justify-center bg-red-500 text-white rounded-full text-[8px]">
              {userCart.length}
              </p>
              )
            ) : null}
          </NavLink>
          {currentUser?(<NavLink to="/user" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </NavLink>):<NavLink to={'/login'}><button >Log in  <FontAwesomeIcon icon={faSignIn}/></button></NavLink>}
        </div>
        <button className="block sm:hidden text-gray-600 focus:outline-none">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;