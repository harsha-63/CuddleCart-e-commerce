import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { users, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find((user) => user.email === email && user.password === password);
    const isAdmin = users.find((user) => user.email === email && user.password === password && user.isAdmin === true);

    if (isAdmin) {
      setCurrentUser(isAdmin);
      navigate('/');
    } else if (foundUser) {
      if (foundUser.isBlock) {
        toast.error("You Are Blocked!");
      } else {
        setCurrentUser(foundUser);
        navigate('/');
      }
    } else {
      toast.error("Not found");
    }
  };

  return (
    <div className="my-20 flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-900"
              placeholder="Email address"
            />
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-900"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-200"
            >
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
  );
};

export default Login;
