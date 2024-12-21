
// import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 sm:px-12 lg:px-24 ">
    <div className="text-center  ">
      <h2 className="text-4xl font-serif font-bold text-gray-800">Contact Us</h2>
      <p className="text-gray-600 text-medium leading-relaxed">
        We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
      </p>
    </div>
    <div className="flex justify-center items-center mt-8 mb-10 ">
      
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-orange-50 shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full">
      {/* Left Section: Image */}
      <div className=" hidden lg:block">
        <img
          src="https://i.pinimg.com/736x/53/0d/b4/530db4b6b208d338959ad3537fda9109.jpg"
          alt="contact"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Section: Form */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6">Get in Touch</h3>
          <form>
            <div className="mb-6">
              <input
                type="text"
                id="name"
                name="name"
                className="appearance-none rounded-lg w-full px-4 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                name="email"
                className="appearance-none rounded-lg w-full px-4 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <textarea
                id="message"
                name="message"
                className="appearance-none rounded-lg w-full px-4 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
                rows="5"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-amber-700 text-white p-2 rounded-md hover:bg-amber-800 transition duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  
  


  );
};

export default Contact;
