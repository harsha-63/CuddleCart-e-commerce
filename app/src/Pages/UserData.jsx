import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Userdata = () => {
    const { currentUser } = useContext(UserContext);
    const { logoutUser } = useContext(CartContext);

    return (
        <div >
            <h1 className="text-3xl font-bold mb-4">Hello, {currentUser.name}!</h1>
            <div className="mb-6">
                <NavLink to="/order">
                    <div className="flex items-center h-12 bg-red-200 text-white rounded-lg cursor-pointer">
                        <span className="flex-grow text-left text-2xl pr-6">My Orders</span>
                    </div>
                </NavLink>
            </div>
            <NavLink to="/">
                <button
                    onClick={logoutUser}
                    className="w-  text-black py-2 rounded-lg"
                >
                    Log Out
                </button>
            </NavLink>
        </div>
    );
};

export default Userdata;