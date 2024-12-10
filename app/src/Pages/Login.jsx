import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Invalid credentials or error occurred");
    }
  };

  return (
    <div className=" flex justify-center items-center mt-16 mb-16">
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl ">
      <div className="hidden md:block">
        <img
          src="https://i.pinimg.com/736x/6a/5b/ee/6a5bee21af5a49795f048e2895c88257.jpg"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-md p-8  bg-orange-200 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg w-full px-4 py-2 font-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                placeholder="Email address"
              />
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg w-full px-4 py-2 border font-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-amber-700 text-white p-2 rounded-md hover:bg-amber-800 transition duration-200">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <NavLink to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  

  )
  
}
  

export default Login;
