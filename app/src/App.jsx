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
import CategoryPage from './Pages/Category';
import PaymentPage from './Pages/Payment'
import Userdata from './Pages/UserData'
import SearchBar from './Pages/Search'
import AdminSideBar from './Admin/Components/AdminSideBar'
import Product from './Admin/Pages/Product'
import Edit from './Admin/Pages/Edit'
import Footer from './Component/Footer'
import AddProduct from './Admin/Pages/AddProduct'
import Order from './Pages/Order'
import Notfound from './Pages/Notfound'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import Dashbord from './Admin/Pages/Dashbord'
import Action from './Admin/Pages/Action'
import Collection from './Pages/Collection'
import { UserContext } from './Context/UserContext'
import Users from './Admin/Pages/Users'
import Wishlist from './Pages/Wishlist';
import Orders from './Admin/Pages/Orders';
import AdminLogin from './Admin/Components/AdminLogin';
import StripeSuccessPage from './Pages/StripeSuccess';



function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Toast Notification */}
      <ToastContainer />

      {/* Sidebar */}
      <div className="w-1/  bg-orange-200 p-4 shadow-md">
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

function UserLayout() {
  const location = useLocation();  // Get the current route

  // Only render Navbar and Footer if the current route is not '/login' or '/signup'
  const hideNavbarFooter = location.pathname === '/login' || location.pathname === '/signup'||location.pathname === '/Adminlogin'
  

  return (
    <div>
      <ToastContainer />
      <div className='px-6 '>
        {/* Conditionally render Navbar and Footer */}
        {!hideNavbarFooter && <Navbar />}
        <SearchBar />
        <Outlet />
        {!hideNavbarFooter && <Footer />}
      </div>
    </div>
  );
}

// sm:px-[8vw] md:px-[10vw] lg:px-[12vw]
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
          <Route path='/Adminlogin' element={<AdminLogin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/collection/:category" element={<CategoryPage />} />
          <Route path='/product/:id' element={<Details />} />
          
          
          {currentUser && (
            <>
              <Route path='/user' element={<Userdata />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/order' element={<Order />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path="/success/:sessionId" element={<StripeSuccessPage />} />
            </>
          )}

          <Route path='/*' element={<Notfound />} />
        </Route>

        {currentUser && currentUser.isAdmin ? (
          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<AdminSideBar />} /> 
            <Route path='/admin' element={<Navigate to='/dashbord' replace />} />
            <Route path='/dashboard' element={<Dashbord/>}/>
            <Route path='/users' element={<Users/>} />
            <Route path='/action/:id' element={< Action/>} />
            <Route path='/items' element={<Product />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/orders' element={< Orders/>} />
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
