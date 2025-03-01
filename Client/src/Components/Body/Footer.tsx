
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdWhatsapp } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative  bg-cover bg-center  mt-20 text-white" style={{ backgroundImage: "url('/footer-banner.jpg')" }}>
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Description */}
        <div>
          <div className="flex items-center mb-4">
            <img src="/logo-light.png" alt="RetroFit Logo" className="w-32 h-20" />
           
          </div>
          <p className="text-sm leading-relaxed">
            We specialize in reverse engineering pump spares and shafts to overcome these challenges.
          </p>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">OUR SERVICES</h3>
          <ul className="text-sm space-y-1">
            <li>Comprehensive Analysis</li>
            <li>CAD Model Creation</li>
            <li>Manufacturing</li>
            <li>Casting Process, Investment Casting</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">COMPANY</h3>
          <ul className="text-sm space-y-1">
            <li>About Us</li>
            <li>Careers</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">CONTACT</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Covai Tech Park, Coimbatore 641014
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              +91 9495 126 256
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              info@rettrofit.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 border-t border-gray-500 text-center py-4 text-sm">
        © 2024 Rettrofit. All Rights Reserved.
      </div>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/919567641722"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        title="Contact us on WhatsApp"
      >
        <MdWhatsapp  fontSize={"20px"}  className="h-10 w-10 text-white"/>
       
      </a>
    </footer>
  );
};

export default Footer;
