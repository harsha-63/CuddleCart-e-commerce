import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    isAdmin: false,
    isBlocked: false,
    cart: [],
    order: []
  });

  const navigate = useNavigate();
  const { fetchUsers, setCurrentUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password && formData.password === formData.confirmpassword) {
      try {
        const response = await axios.post('http://localhost:4000/user', formData);
        alert("Sign up successful");
        setCurrentUser(response.data);
        await fetchUsers();
        navigate('/login');
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      alert("Please fill in all fields and ensure passwords match.");
    }
  };

  return (
    <div className="h-screen w-full flex">
      {/* Left Side: Background Image */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/6a/5b/ee/6a5bee21af5a49795f048e2895c88257.jpg')",
        }}
      ></div>

      {/* Right Side: Form */}
      <div className="w-1/2 h-full flex justify-center items-center">
      <div className="w-2/3 max-w-md p-8 bg-white rounded-lg shadow-lg hover:scale-105 focus:scale-105 transition-transform duration-200 bg-gradient-to-r from-amber-100  to-amber-100">
    <h2 className="text-4xl font-serif text-gray-800 text-center mb-6">Sign Up</h2>

    <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium hover:text-sm"
      placeholder="Username"
      required
    />
  </div>

  <div className="mb-4">
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium hover:text-sm"
      placeholder="Email"
      required
    />
  </div>

  <div className="mb-4">
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium hover:text-sm"
      placeholder="Password"
      required
    />
  </div>

  <div className="mb-4">
    <input
      type="password"
      name="confirmpassword"
      value={formData.confirmpassword}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium hover:text-sm"
      placeholder="Confirm Password"
      required
    />
  </div>


      <button
        type="submit"
        className=" w-full bg-amber-700 text-white p-2 rounded-md hover:bg-amber-800 transition duration-200">
        Sign Up
      </button>
    </form>

    <p className=" text-center text-gray-600 text-sm">
      Already have an account?{" "}
      <a href="/login" className="text-blue-600 hover:underline font-semibold">
        Log In
      </a>
    </p>
  </div>
</div>

      </div>
  );
};

export default Signup;

