

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-4 bg-slate-300 w-auto h- justify-center">
        {/* Left Side: Image */}
        <div className="flex justify-center ">
          <img
            src="https://i.pinimg.com/736x/63/d6/8a/63d68a0b696780e115d257e11b025c78.jpg"  // Replace with your image URL
            alt="About CuddleCart"
            className=""
          />
        </div>

        {/* Right Side: About Text */}
        <div className="text-center lg:text-left object-cover">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About CuddleCart</h2>
          <p className="text-gray-600 mb-4">
            Welcome to CuddleCart, your one-stop shop for everything baby! From cute and cozy clothing to
            essential baby gear, we are dedicated to providing you with high-quality products that make life
            easier for both parents and little ones. Our carefully curated selection ensures comfort, safety,
            and style for your baby.
          </p>
          <p className="text-gray-600">
            At CuddleCart, we believe in offering only the best for your baby, and our mission is to make
            shopping for baby essentials a joyful experience. We aim to make parenting just a little bit
            easier, with a wide range of products that are both functional and fashionable.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
          <p className="text-gray-600">
            We understand the importance of quality when it comes to your baby. Heres why parents love shopping with us:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quality Assurance</h3>
            <p className="text-gray-600">
              All our products are carefully curated and tested for safety, durability, and comfort to ensure the best for your little one.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Affordable Prices</h3>
            <p className="text-gray-600">
              We believe in offering high-quality products at prices that make it easier for parents to get what they need without breaking the bank.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Fast Delivery</h3>
            <p className="text-gray-600">
              We understand that timing is critical. Thats why we offer fast, reliable delivery to make sure your baby essentials arrive on time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
