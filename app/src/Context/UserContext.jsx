
import { createContext, useState,useEffect } from "react";
import Cookies from "js-cookie";  
import axios from "axios";
import { toast } from "react-toastify"
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";




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
      else{
        setCurrentUser(null)
      }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("currentUser")]);

  const registerUser = async (name, email, password) => {
    const data = { name, email, password };
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
      toast.success(response.data.message);  
      
    } catch (error) {
      toast.error(axiosErrorManager(error)); 
    } finally {
      setLoading(false); 
    }
  };





  const loginUser = async (email, password) => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password }, { withCredentials: true });
      console.log(data)
      Cookies.set("currentUser",JSON.stringify(data.currentUser))
      const user = Cookies.get("currentUser");
      setCurrentUser(JSON.parse(user));
      Cookies.set("token", data.token); 
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(axiosErrorManager(err));
  
    }
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post("auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
      setCurrentUser(null)
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Error logging out");
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const res=await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
      
      const admin = Cookies.get("currentUser");
      setCurrentUser(JSON.parse(admin));
      toast.success("Admin logged in successfully");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };


  const value = { currentUser, setCurrentUser,isAdmin,loading,setLoading,loginUser,logoutUser,loginAdmin ,registerUser};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
