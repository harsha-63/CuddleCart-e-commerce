import { createContext, useState,useEffect } from "react";
import axios from "axios";


export const UserContext=createContext();
// eslint-disable-next-line react/prop-types
const UserProvider=({children})=>{
 const [currentUser,setCurrentUser]=useState(null)
 const[users,setUsers]=useState([]) 
  
 const fetchUsers = async () => {
   try {
     const {data} = await axios.get('http://localhost:4000/user')
     setUsers(data)
   } catch (error) {
     console.log(error);
   }
 }
 useEffect(()=>{
   fetchUsers()
 },[])
 useEffect(() => {
   const storedUser = localStorage.getItem('currentUser');
   if (storedUser) {
     setCurrentUser(JSON.parse(storedUser)); 
   }
 }, []); 
 
 useEffect(() => {
   if (currentUser) {
     localStorage.setItem('currentUser', JSON.stringify(currentUser));
   } else {
     localStorage.removeItem('currentUser');
   }
 }, [currentUser]);
 
 
 useEffect(() => {
     console.log(users);
 }, [users]);
 

 const value={ currentUser ,users ,setCurrentUser,fetchUsers}
return(
<UserContext.Provider value={value}>
    {children}
</UserContext.Provider>
 )    
}
export default UserProvider

