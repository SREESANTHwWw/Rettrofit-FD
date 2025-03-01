import React from 'react';
import { MdEngineering, MdPrecisionManufacturing, MdAccessTime } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";

const FeaturesSection4 = () => {
  const features = [
    { icon: <MdEngineering size={40} />, title: "Integrity", text: "Fulfilling client requests on the go" },
    { icon: <MdPrecisionManufacturing size={40} />, title: "Damaged Parts", text: "Manufacturing the requested product" },
    { icon: <MdAccessTime size={40} />, title: "Tradition", text: "Finishing upon requested time" },
    { icon: <FaHandshakeSimple size={40} />, title: "Safety", text: "Purchasing quality product" },
  ];

  return (
    <div className="flex flex-col items-center bg-blue-800 rounded-tl-[100px] justify-center mt-11 px-4 py-10  gap-7">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center p-4 sm:p-6 bg-blue-700 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="border-4 sm:border-8 border-emerald-500 rounded-full p-4 sm:p-6 bg-emerald-500 bg-opacity-20">
              <div className="text-white">{feature.icon}</div>
            </div>
            <h3 className="text-base sm:text-lg text-white font-bold mt-4">{feature.title}</h3>
            <p className="text-sm sm:text-base text-white mt-2">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection4;
