
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <>
      <div className="bg-white py-10">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 px-4 sm:px-10 text-sm text-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <img src={logo} className="w-36 mb-4 sm:mb-0" alt="Logo" />
            <p className="ml-0 sm:ml-4">
              Explore our collection of baby products, crafted with the highest quality materials to ensure comfort, safety, and durability for your little one.
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-4">COMPANY</p>
            <ul className="flex flex-col gap-2">
              <li className="hover:text-green-600 transition-colors duration-200">Home</li>
              <li className="hover:text-green-600 transition-colors duration-200">About Us</li>
              <li className="hover:text-green-600 transition-colors duration-200">Contact Us</li>
              <li className="hover:text-green-600 transition-colors duration-200">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-4">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2">
              <li className="hover:text-green-600 transition-colors duration-200">+91-123-456-7890</li>
              <li className="hover:text-green-600 transition-colors duration-200">cuddlecart@gmail.com</li>
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