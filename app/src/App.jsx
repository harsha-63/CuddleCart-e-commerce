import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate,Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Cart from './Pages/Cart'
import Navbar from './Component/Navbar'
import Details from './Pages/Details'
import PaymentPage from './Pages/Payment'
import Userdata from './Pages/Userdata'
import SearchBar from './Pages/Search'
import AdminSideBar from './Admin/Components/AdminSideBar'
import Product from './Admin/Pages/Product'
import Edit from './Admin/Pages/Edit'
import Footer from './Component/Footer'
import AddProduct from './Admin/Pages/AddProduct'
import Order from './Pages/Order'

import Notfound from './Pages/Notfound'

import { useContext } from 'react'

import Dashbord from './Admin/Pages/Dashbord'
import Action from './Admin/Pages/Action'
import Collection from './Pages/Collection'
import { UserContext } from './Context/UserContext'
import Users from './Admin/Pages/Users'



function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <ToastContainer/>
       <div className="w-1/5">
        <AdminSideBar />
      </div>
      <div className="w-4/5 p-6">
        <Outlet/>
      </div>
    </div>
  );
}


function UserLayout() {
  return (
    <>
    <ToastContainer/>
    <div className='px-4 sm:px-[5vw] md:px-[7vm] lg:px-[9vw]'>
      
      <Navbar />
      <SearchBar />
       <Outlet />
      <Footer/>
    </div>
    </>
  );
}

function App() {
  const { currentUser } = useContext(UserContext)

  return (
    <Router>
      <Routes>
       
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:id' element={<Details />} />
          
          
          {currentUser && (
            <>
              <Route path='/user' element={<Userdata />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/order' element={<Order />} />
            </>
          )}

          <Route path='/*' element={<Notfound />} />
        </Route>

        {currentUser && currentUser.isAdmin ? (
          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<AdminSideBar />} /> 
            <Route path='/admin' element={<Navigate to='/dashbord' replace />} />
            <Route path='/dashbord' element={<Dashbord/>}/>
            <Route path='/users' element={<Users/>} />
            <Route path='/action/:id' element={< Action/>} />
            <Route path='/items' element={<Product />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/add' element={<AddProduct />} />
          </Route>
        ) : (
          <Route path='/admin/*' element={<Navigate to='/*' replace />} />
        )}

        
        <Route path='/*' element={<Notfound />} />
      </Routes>
    </Router>
  )
}

export default App
