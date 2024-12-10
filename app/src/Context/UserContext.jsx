// import { createContext } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";





// export const UserContext = createContext()
// // eslint-disable-next-line react/prop-types
// const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   // const [cart, setCart] = useState([]);
//   // const [wishlist, setWishlist] = useState([]);
//   const navigate = useNavigate();

//   const isAdmin = currentUser !== null && currentUser.isAdmin? true : false;

// const registerUser = async (name,email,password)=>{
//   const data = {
//     name:name,
//     email:email,
//     password:password
//   }

// }

// const value = {
//   currentUser,setCurrentUser,loading,setLoading,registerUser
// }
// return (
//   <UserContext.Provider value={value}>{children}</UserContext.Provider>
// )
// }

// export default UserProvider



import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";  

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isAdmin = currentUser !== null && currentUser.isAdmin? true : false;

 
  useEffect(() => {
    const cookieUser = Cookies.get("currentUser");
    if (cookieUser) {
      try {
        setCurrentUser(JSON.parse(cookieUser));
      } catch (error) {
        console.error("Failed to parse currentUser cookie:", error);
      }
    }
  }, []);

  const value = { currentUser, setCurrentUser,isAdmin,loading,setLoading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
