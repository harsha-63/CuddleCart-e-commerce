import { createContext, useState } from "react";


export const UserContext=createContext();
// eslint-disable-next-line react/prop-types
const UserProvider=({children})=>{
 const [currentUser,setCurretUser]=useState(null)
  
 

 const value={currentUser,setCurretUser}
return(
<UserContext.Provider value={value}>
    {children}
</UserContext.Provider>
 )    
}
export default UserProvider

