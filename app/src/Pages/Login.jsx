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
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="grid grid-cols-1  lg:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl max-lg:shadow-none max-lg:">
        <div className="hidden lg:block ">
          <img
            src="https://i.pinimg.com/736x/6a/5b/ee/6a5bee21af5a49795f048e2895c88257.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md p-4 sm:p-8 bg-orange-200 rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 text-center mb-4 sm:mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  placeholder="Email address"
                />
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  placeholder="Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition duration-200 text-sm sm:text-base"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-sm sm:text-base text-gray-600">
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
  );
}

export default Login;
