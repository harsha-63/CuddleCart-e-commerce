import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";


const Userdata = () => {
    const { currentUser, logoutUser } = useContext(UserContext);

    return (
        <div className="max-w-3xl mx-auto p-16 bg-white shadow-xl rounded-lg mt-16">
            <h1 className="text-4xl font-serif text-gray-800 mb-10">Hello, {currentUser.name}!</h1>
            

            {/* My Orders Section */}
            <div className="mb-6">
                <NavLink to="/order">
                    <div className="">
                        <span className="flex-grow text-left text-xl  font-medium">My Orders <FontAwesomeIcon icon={faShoppingBag}/></span>
                        
                    </div>
                </NavLink>
            </div>

            {/* Logout Button */}
            <NavLink to="/">
                <button
                    onClick={logoutUser}
                    className=" ml-56 w-2/6  text-white bg-amber-700  py-3 rounded-lg mt-4 transition duration-300 ease-in-out shadow-md"
                >
                    Log Out
                </button>
            </NavLink>
        </div>
    );
};

export default Userdata;

