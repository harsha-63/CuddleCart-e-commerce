import { faDashboard, faListAlt, faShoppingBag, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, } from "react-router-dom";
// import Dashbord from "../Pages/Dashbord";
// import Users from "../Pages/Users";
// import Product from "../Pages/Product";
// import Order from "../../Pages/Order";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const AdminSidebar = () => {
     const {logOutUser}=useContext(CartContext)

    
  return (
    <div className="flex">
      
      <div className="h-screen fixed top-0 left-0 w-1/5 bg-orange-200 text-white flex flex-col justify-between shadow-lg">
        {/* Branding */}
        <div className="p-6 mt-10 text-center">
          <NavLink to="/" className="font-atma text-3xl font-semibold text-amber-950">
            Cuddle Cart
          </NavLink>
        </div>
  
        {/* Navigation Links */}
        <nav className="flex-grow mt-12 text-black ">
         <ul className="flex flex-col  justify-center px-20 space-y-4">
            <NavLink
              to="/dashbord"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg"
            >
              <li className="flex items-center">
                <FontAwesomeIcon icon={faDashboard} className="mr-3" />
                <span>Dashboard</span>
              </li>
            </NavLink>
            <NavLink
              to="/users"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg"
            >
              <li className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-3 " />
                <span >Users</span>
              </li>
            </NavLink>
            <NavLink
              to="/items"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg"
            >
              <li className="flex items-center">
                <FontAwesomeIcon icon={faListAlt} className="mr-3" />
                <span>Products</span>
              </li>
            </NavLink>
            <NavLink
              to="/order"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg"
            >
              <li className="flex items-center">
                <FontAwesomeIcon icon={faShoppingBag} className="mr-3" />
                <span>Orders</span>
              </li>
            </NavLink>
          </ul>
        </nav>
  
        {/* Logout */}
        <div className="mb-20 px-4 flex flex-col justify-center items-center">
          <NavLink
            to="/"
            className="block px-4 py-3 bg-amber-700 hover:bg-amber-800 text-white transition-all rounded-lg"
            onClick={logOutUser}
          >
            <li className="flex items-center">
              <FontAwesomeIcon icon={faSignOut} className="mr-3" />
              <span>LogOut</span>
            </li>
          </NavLink>
        </div>
      </div>
  
     
    </div>
  );
  
};

export default AdminSidebar;