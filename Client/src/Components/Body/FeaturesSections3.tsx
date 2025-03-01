import React from "react";

const FeaturesSections3 = () => {
  return (
    <div className="flex items-center  justify-center mt-24 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-around items-center gap-8 p-8 max-w-8xl w-full  rounded-xl shadow-lg">
        
        {/* Vision Section */}
        <div className="flex flex-col max-w-md text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h1>
          <p className="text-gray-700">
            To be a global leader in engineering and <br />
             trading, recognized for our
            innovation, <br /> reliability, 
             and commitment to <br /> sustainability. We aim to 
            build long-term <br /> partnerships with our clients by <br /> consistently 
            exceeding their expectations.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col max-w-md text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h1>
          <p className="text-gray-700">
            Our mission is to deliver innovative, reliable, and cost- <br />  effective
            solutions that empower our clients to <br /> achieve their operational
            goals. We are committed to <br /> sustainability, quality, and customer
            satisfaction, <br /> ensuring that every product and service we provide <br />
            adds value to your business.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img 
            src="/vision_img.jpg" 
             loading="lazy"
            alt="Illustration representing our vision" 
            className="w-80 h-64 object-cover rounded-lg shadow-md"
          />
        </div>

      </div>
    </div>
  );
};

export default FeaturesSections3;
