const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* First Section: Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
        {/* Left Side: Image */}
        <div className="flex justify-center">
          <img
            src="https://example.com/contact-image.jpg" // Replace with your contact image
            alt="Contact Us"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Right Side: Contact Info */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
          </p>
          <div className="mb-6">
            <p className="font-semibold text-lg text-gray-600">Our Store</p>
            <p className="text-gray-500">
              Cuddle Cart <br />
              Thurakkal Bypass, Manjeri
            </p>
            <p className="text-gray-500">
              Tel: +91-123-456-7890 <br />
              Email: cuddlecart@gmail.com
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-600">Careers at CuddleCart</p>
            <p className="text-gray-500">Interested in joining our team? Send us an email!</p>
          </div>
        </div>
      </div>

      {/* Second Section: Contact Form */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Get in Touch</h3>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 border border-gray-300 rounded-md"
            rows="4"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-md hover:bg-amber-950 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
