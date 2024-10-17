import { BrowserRouter as Router,Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Component/Navbar"
import Footer from "./Component/Footer"
import Home from "./Pages/Home"


const App = () => {
  return (
    <>
      <Router>
      <ToastContainer/>
      <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>

      
       </Routes>
    <Footer/>
     </Router>
    </>
  )
}


export default App
