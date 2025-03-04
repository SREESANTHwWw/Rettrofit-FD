import { useState, useEffect } from "react";

const ProgressLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="p-6 w-[90%] max-w-3xl text-center">
        <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
        <div className="w-full h-2 bg-gray-300 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full  bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-3 text-lg text-gray-700">{progress}%</p>
      </div>
    </div>
  );
};

export default ProgressLoader;
