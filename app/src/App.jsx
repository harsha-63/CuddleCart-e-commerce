import { BrowserRouter as Router,Route, Routes } from "react-router-dom"
import Navbar from "./Component/Navbar"
import Footer from "./Component/Footer"
import Home from "./Pages/Home"


const App = () => {
  return (
    <>
      <Router>
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
