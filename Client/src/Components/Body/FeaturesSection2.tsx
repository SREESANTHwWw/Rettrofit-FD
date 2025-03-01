import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export const FeaturesSection2 = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 md:px-10  gap-10">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between gap-10">
        
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/about_banner.avif"
            alt="Background"
             loading="lazy"
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
        </div>
        
        {/* Content Section */}
        <div className="flex flex-col lg:w-1/2 w-full gap-5">
          <h2 className="text-md text-emerald-500 font-medium">
            Our Solutions and Services
          </h2>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Reverse Engineering Expertise
          </h1>
          <p className="text-gray-600 leading-relaxed">
            We specialize in reverse engineering pump spares and shafts to 
            overcome challenges like obsolete parts, long lead times, and 
            escalating costs. Our expertise allows us to quickly and accurately 
            reproduce critical components, keeping your pumps running smoothly 
            and minimizing downtime.
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-3 mt-4">
            {["High-Quality Services", "Customer-Centric Approach", "Experienced Team"].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <IoCheckmarkCircleOutline fontSize={"25px"} className="text-emerald-500" />
                <span className="text-gray-700 text-lg">{item}</span>
              </div>
            ))}
          </div>

          {/* Contact Button */}
          <div className="mt-6">
            <button className="relative h-[50px] w-40 overflow-hidden bg-emerald-500 rounded-full px-5 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-800 before:transition-all before:duration-500 hover:text-white hover:shadow-emerald-500 hover:before:w-full">
              <span className="relative z-10">Contact Us</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
