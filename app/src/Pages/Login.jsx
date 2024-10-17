import  { useContext, useState } from 'react';
import { NavLink, useNavigate, } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';


const Login = () => {
  const {users,setCurrentUser}=useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser= users.find((user)=>user.email==email&& user.password==password)
    const isAdmin=users.find((user)=>user.email==email&& user.password==password&&user.isAdmin==true)
    
    if(isAdmin){
      setCurrentUser(isAdmin)
       navigate('/')}
       else if(foundUser){
        if(foundUser.isBlock){
          alert('you are blocked')
        }
        else{
        setCurrentUser(foundUser);
        navigate('/')
        }
        
      }
      else{
      alert("not found")
    }
  };  
  

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md border-black">
        <h2 className="text-center text-3xl font-bold text-gray-900">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            
              
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
              /> 
            </div>

            <div>
             
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
          

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600"> Dont have an account? <NavLink to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</NavLink></p>
        </div>
      </div>
    </div>
  );
};

export default Login;