import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Userdata = () => {
    const { currentUser, logoutUser } = useContext(UserContext);

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-16">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Hello, {currentUser.name}!</h1>

            {/* My Orders Section */}
            <div className="mb-6">
                <NavLink to="/order">
                    <div className="flex items-center h-14 bg-amber-700  text-white rounded-lg cursor-pointer hover:bg-amber-700 transition duration-300 ease-in-out shadow-md">
                        <span className="flex-grow text-left text-xl pl-6 font-medium">My Orders</span>
                        
                    </div>
                </NavLink>
            </div>

            {/* Logout Button */}
            <NavLink to="/">
                <button
                    onClick={logoutUser}
                    className="w-full text-white bg-amber-700  py-3 rounded-lg mt-4 transition duration-300 ease-in-out shadow-md"
                >
                    Log Out
                </button>
            </NavLink>
        </div>
    );
};

export default Userdata;

