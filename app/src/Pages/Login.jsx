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
    <div className="h-screen w-full flex items-center justify-between bg-white px-0 md:px-0">
  {/* Left side with the background image */}
  <div
    className="w-1/2 h-full bg-cover bg-center"
    style={{
      backgroundImage: "url('https://i.pinimg.com/736x/6a/5b/ee/6a5bee21af5a49795f048e2895c88257.jpg')",
    }}
  ></div>

  {/* Right side with login content */}
  <div className="w-1/2 h-full flex justify-center items-center">
    <div className="w-2/3 max-w-md p-8 bg-white rounded-lg shadow-lg hover:scale-105 focus:scale-105 transition-transform duration-200 bg-gradient-to-r from-amber-100  to-amber-100">
      <h2 className="text-4xl font-serif text-gray-800 text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-lg w-full px-4 py-2 font-medium border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-base"
            placeholder="Email address"
          />
          <input
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-lg w-full px-4 py-2 border font-medium border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-base"
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
  )
  
}
  

export default Login;
