
import { createContext, useState,useEffect } from "react";
import Cookies from "js-cookie";  
import axios from "axios";
import { toast } from "react-toastify"
import axiosErrorManager from "../../utilities/axiosErrorManager";



export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isAdmin = currentUser && currentUser.isAdmin ? true : false;
  

 
  useEffect(() => {
    const user = Cookies.get("currentUser");
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error("Failed to parse currentUser cookie:", error);
      }
    }
  }, []);
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3002/auth/login", { email, password }, { withCredentials: true });
      const user = Cookies.get("currentUser");
      setCurrentUser(JSON.parse(user));
      const { token } = response.data;
      Cookies.set("token", token); 
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error("Invalid credentials or error occurred");
      throw err;  
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:3002/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Error logging out");
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      await axios.post(
        "http://localhost:3002/auth/admin",
        { email, password },
        { withCredentials: true }
      );
      const cookieAdmin = Cookies.get("currentUser");
      setCurrentUser(JSON.parse(cookieAdmin));
      toast.success("Admin logged in successfully");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };


  const value = { currentUser, setCurrentUser,isAdmin,loading,setLoading,loginUser,logoutUser,loginAdmin };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
