import { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
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
    <div className="min-h-screen flex justify-center items-center ">
  <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl">
    <div className="hidden md:block">
      <img
        src="https://i.pinimg.com/736x/6a/5b/ee/6a5bee21af5a49795f048e2895c88257.jpg"
        alt="Sign Up"
        className="w-full h-full object-cover"/>
    </div>
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-md p-8 bg-orange-200 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="appearance-none rounded-lg w-full px-4 py-2 font-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="appearance-none rounded-lg w-full px-4 py-2 font-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
              placeholder="Email address"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="appearance-none rounded-lg w-full px-4 py-2 border font-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              className="appearance-none rounded-lg w-full px-4 py-2 border font-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-amber-700 text-white p-2 rounded-md hover:bg-amber-800 transition duration-200">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

);
};

export default Signup;

