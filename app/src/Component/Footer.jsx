
// import logo from '../assets/logo.jpg';
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="relative bg-orange-200 mt-32 py-16">
  {/* Zigzag Shape */}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="absolute top-[-10px] w-full z-20">
  <path
    fill="white"
    d="M0,0 L1440,0 L1440,30 Q1380,50 1320,30 Q1260,10 1200,30 Q1140,50 1080,30 Q1020,10 960,30 Q900,50 840,30 Q780,10 720,30 Q660,50 600,30 Q540,10 480,30 Q420,50 360,30 Q300,10 240,30 Q180,50 120,30 Q60,10 0,30 Z"
  />
</svg>
  <div className="max-w-screen-xl mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 px-4 sm:px-10 text-sm text-gray-700 relative z-10">
    <div className="flex flex-col sm:flex-row items-start sm:items-center">
      <div >
        <NavLink to='/' className="font-atma text-3xl font-semibold text-amber-950">Cuddle Cart</NavLink>
      </div>
      <p className="ml-0 sm:ml-4">
        Explore our collection of baby products, crafted with the highest quality materials to ensure comfort, safety, and durability for your little one.
      </p>
    </div>
    <div>
      <p className="text-xl font-medium mb-4">COMPANY</p>
      <ul className="flex flex-col gap-2">
        <li className="hover:text-amber-600 transition-colors duration-200">Home</li>
        <li className="hover:text-amber-600 transition-colors duration-200">About Us</li>
        <li className="hover:text-amber-600 transition-colors duration-200">Contact Us</li>
        <li className="hover:text-amber-600 transition-colors duration-200">Privacy Policy</li>
      </ul>
    </div>
    <div>
      <p className="text-xl font-medium mb-4">GET IN TOUCH</p>
      <ul className="flex flex-col gap-2">
        <li className="hover:text-amber-600 transition-colors duration-200">+91-123-456-7890</li>
        <li className="hover:text-amber-600 transition-colors duration-200">cuddlecart@gmail.com</li>
      </ul>
    </div>
  </div>
</div>

<div className="bg-white">
  <hr />
  <p className="py-4 text-center text-sm text-gray-600">Copyright 2024 @ cuddlecart.com - All rights reserved.</p>
</div>

    </>
  );
};

export default Footer;