import { faDashboard, faListAlt, faShoppingBag, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import Dashbord from "../Pages/Dashbord";
import Users from "../Pages/Users";
import Product from "../Pages/Product";
import Order from "../../Pages/Order";

const AdminSidebar = () => {
     const location=useLocation();

     const render=()=>{
        switch(location.pathname){
          case '/dashbord':
            return <Dashbord/>
          case '/users':
            return <Users/>
          case '/items':
            return <Product/>
          case '/order':
            return <Order/>
          default:
            return <Dashbord/>
        }
     }


  return (
    <div className="flex">
    <div className="  h-screen fixed top-0 left-0 w-1/5 bg-red-400 text-white flex-col flex justify-center items-center">
     
      <div className="p-6">
        <NavLink to={'/'}>
          <img src={"project/src/assets/logo.jpg"} className="w-20 sm:w-28 lg:w-40" alt="Logo" />
        </NavLink>
        <h1 className="text-2xl font-bold mt-6 text-center">Admin Hub</h1>
      </div>
      
      <nav className="flex-grow mt-4 items-center justify-between text-center">
        <ul className="space-y-5">
          <NavLink to={'/dashbord'} className="block px-4 py-3 hover:bg-white hover:text-gray-800 transition-all rounded-md">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faDashboard} className="mr-3" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <NavLink to={'/users'} className="block px-4 py-3 hover:bg-white hover:text-gray-800 transition-all rounded-md">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              <span>Users</span>
            </li>
          </NavLink>
          <NavLink to={'/items'} className="block px-4 py-3 hover:bg-white hover:text-gray-800 transition-all rounded-md">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faListAlt} className="mr-3" />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to={'/order'} className="block px-4 py-3 hover:bg-white hover:text-gray-800 transition-all rounded-md">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faShoppingBag} className="mr-3" />
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to={'/'} className="block px-4 py-3 hover:bg-white hover:text-gray-800 transition-all rounded-md">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faSignOut} className="mr-3" />
              <span>LogOut</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
    <div className="ml-1/5 w-4/5 p-6">
        {render()} 
      </div>
  </div>
  );
};

export default AdminSidebar;