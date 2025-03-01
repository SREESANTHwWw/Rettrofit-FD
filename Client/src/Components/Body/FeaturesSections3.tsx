const FeaturesSections3 = () => {
  return (
    <div className="flex items-center justify-center mt-16 bg-gray-100 px-4 py-12">
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-10 p-6 max-w-7xl w-full rounded-xl shadow-lg bg-white">
        
        {/* Vision Section */}
        <div className="flex flex-col max-w-md text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h1>
          <p className="text-gray-700 leading-relaxed">
            To be a global leader in engineering and trading, recognized for our
            innovation, reliability, and commitment to sustainability. We aim to 
            build long-term partnerships with our clients by consistently exceeding 
            their expectations.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col max-w-md text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h1>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to deliver innovative, reliable, and cost-effective solutions 
            that empower our clients to achieve their operational goals. We are committed 
            to sustainability, quality, and customer satisfaction, ensuring that every 
            product and service we provide adds value to your business.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img 
            src="/vision_img.jpg" 
            loading="lazy"
            alt="Illustration representing our vision" 
            className="w-72 h-60 object-cover rounded-lg shadow-md"
          />
        </div>
      

      </div>
    </div>
  );
};

export default FeaturesSections3;
