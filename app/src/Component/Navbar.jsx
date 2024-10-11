import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    <>
     <div>
        <img src="" alt="" />
        <nav>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/collection'}>Collection</NavLink>
            <NavLink to={'/about'}>About</NavLink>
            <NavLink to={'/contact'}>Contact</NavLink>
        </nav>
        <div>
            <NavLink to="/cart" className="hover:text-gray-400 relative"/>
            <NavLink></NavLink>
            <NavLink></NavLink>
        </div>
     </div>
    </>
  )
}

export default Navbar