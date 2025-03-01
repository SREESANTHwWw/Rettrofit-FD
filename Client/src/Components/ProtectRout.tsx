// import { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";

// interface ProtectedRouteProps {
//   children: ReactNode;
//   allowedTypes?: string[]; // Optional array of allowed roles
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedTypes }) => {
//   const tokenData = localStorage.getItem("token");
//   const decodedToken = jwtDecode(tokenData);

//   if (!decodedToken) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check if the role is allowed
//   if (allowedTypes && !allowedTypes.includes(decodedToken.role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

<div className="relative flex items-center justify-center h-full">
<div className="w-[90%] md:w-[50%] bg-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-md shadow-lg text-white">
  <h1 className="text-3xl font-semibold mb-6 text-center">Let's Get in Touch</h1>

  <form className="space-y-5">
    {/* Name */}
    <div>
      <label className="block text-lg mb-2">Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full p-3 rounded-lg bg-white/20 focus:ring-2 focus:ring-white/60 outline-none"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-lg mb-2">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 rounded-lg bg-white/20 focus:ring-2 focus:ring-white/60 outline-none"
      />
    </div>

    {/* Contact Number */}
    <div>
      <label className="block text-lg mb-2">Contact Number</label>
      <input
        type="tel"
        placeholder="Enter your contact number"
        className="w-full p-3 rounded-lg bg-white/20 focus:ring-2 focus:ring-white/60 outline-none"
      />
    </div>

    {/* Services */}
    <div>
      <label className="block text-lg mb-2">Services</label>
      <select
        id="services"
        name="services"
        className="w-full p-3 rounded-lg bg-white/20 focus:ring-2 focus:ring-white/60 outline-none"
      >
        <option value="" disabled selected>Select a service</option>
        <option value="web-design">Web Design</option>
        <option value="development">Development</option>
        <option value="seo">SEO Optimization</option>
      </select>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full mt-4 p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300 font-semibold text-lg"
    >
      Submit
    </button>
  </form>
</div>
</div>