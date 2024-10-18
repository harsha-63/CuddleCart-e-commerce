import  { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin:false,
    isBlocked:false,
    cart:[],
    order:[]
  });
 const navigate=useNavigate();
 const {fetchUsers,setCurrentUser}=useContext(UserContext)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
    try {
      const response=  await axios.post('http://localhost:4000/user', formData);
      alert("Sign up successful");
      setCurrentUser(response.data)
      await fetchUsers();
      navigate('/login'); 
      
      
    } catch (error) {
      console.error("Error signing up:", error);
    }
    } else {
    
      alert("please fill the all fields")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 items-center">Sign up</h1>

        {alert && <p className="mb-4 text-center text-green-600">{alert}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
           
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
           
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Conform password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;