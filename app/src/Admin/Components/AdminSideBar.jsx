import { faDashboard, faListAlt, faShoppingBag, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const AdminSidebar = () => {
  const { logOutUser } = useContext(CartContext);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        {/* Branding */}
        <div className="p-4 mt-8 text-center">
          <NavLink to="/" className="font-atma text-3xl font-semibold text-amber-950 hidden lg:block">
            Cuddle Cart
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow mt-8 text-black">
          <ul className="flex flex-col items-center  space-y-4">
            <NavLink
              to="/dashboard"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg text-center"
            >
              <li className="flex items-center justify-center ">
                <FontAwesomeIcon icon={faDashboard} className="mr-0 lg:mr-3" />
                <span className="hidden lg:inline">Dashboard</span>
              </li>
            </NavLink>
            <NavLink
              to="/users"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg text-center mr-11"
            >
              <li className="flex items-center justify-center ">
                <FontAwesomeIcon icon={faUser} className="mr-0 lg:mr-3" />
                <span className="">Users</span>
              </li>
            </NavLink>
            <NavLink
              to="/items"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg text-center mr-4"
            >
              <li className="flex items-center justify-center ">
                <FontAwesomeIcon icon={faListAlt} className="mr-0 lg:mr-3" />
                <span className="">Products</span>
              </li>
            </NavLink>
            <NavLink
              to="/orders"
              className="block px-4 py-3 hover:bg-amber-700 hover:text-white transition-all rounded-lg text-center mr-8"
            >
              <li className="flex items-center justify-center ">
                <FontAwesomeIcon icon={faShoppingBag} className="mr-0 lg:mr-3" />
                <span className="hidden lg:inline">Orders</span>
              </li>
            </NavLink>
          </ul>
        </nav>

        {/* Logout */}
        <div className="mb-8 px-4">
          <NavLink
            to="/"
            className="block px-4 py-3 bg-amber-700 hover:bg-amber-800 text-white transition-all rounded-lg text-center"
            onClick={logOutUser}
          >
            <li className="flex items-center justify-center lg:justify-start">
              <FontAwesomeIcon icon={faSignOut} className="mr-0 lg:mr-3" />
              <span className="hidden lg:inline">LogOut</span>
            </li>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
// fixed pe-10 top-0 left-0 h-full bg-orange-200 text-white shadow-lg w-16 lg:w-[250px] flex flex-col justify-between transition-all

