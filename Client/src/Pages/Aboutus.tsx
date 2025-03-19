import { motion } from "framer-motion";
import { FaCogs, FaIndustry, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";
import NavBarWithOutBg from "../Components/NavBar1/NavBarWithOutBg";
import Footer from "../Components/Body/Footer";

const Aboutus = () => {
  return (
    <>
      {/* Navbar Outside the Section */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBarWithOutBg />
      </div>

      <section className="min-h-screen bg-cover bg-center bg-no-repeat py-44 px-6 pt-60"  style={{ backgroundImage: "url('/about_banner.webp')" }}> {/* Added pt-28 for spacing */}
        {/* About Us Heading */}
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-extrabold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h2>
          <p className="text-white mt-4 text-lg leading-relaxed max-w-3xl mx-auto">
            We specialize in <span className="font-semibold text-teal-500">reverse engineering solutions</span> for
            <span className="font-semibold text-teal-500"> pump spares, shafts, and industrial components</span>.
            Our expertise ensures <span className="font-semibold text-teal-500">cost-effective, high-quality replacements</span>
            for obsolete or damaged parts.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all border border-gray-200"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <feature.icon className="text-6xl text-teal-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          className="mt-20 text-center max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-semibold text-gray-800">Get in Touch</h3>
          <p className="text-gray-600 mt-2 text-lg">
            Need a reverse-engineered part? Contact us today!
          </p>
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-6 text-teal-600 text-lg font-medium">
            <span className="flex items-center gap-2 hover:text-teal-800 cursor-pointer transition duration-300">
              📞 +123 456 7890
            </span>
            <span className="flex items-center gap-2 hover:text-teal-800 cursor-pointer transition duration-300">
              📧 info@example.com
            </span>
            <span className="flex items-center gap-2 hover:text-teal-800 cursor-pointer transition duration-300">
              💬 WhatsApp: +123 456 7890
            </span>
          </div>
        </motion.div>
      </section>
      <div>
        <Footer/>
      </div>
    </>
  );
};

// Feature List
const features = [
  { title: "Advanced Technology", description: "Utilizing 3D scanning, laser scanning & CAD modeling.", icon: FaCogs },
  { title: "Industry Experts", description: "Years of experience in reverse engineering components.", icon: FaIndustry },
  { title: "Quality Assurance", description: "High precision manufacturing & rigorous testing.", icon: FaShieldAlt },
  { title: "Rapid Turnaround", description: "Quick delivery to minimize downtime.", icon: FaClock },
  { title: "Trusted by Industries", description: "Oil & Gas, Power, Marine, Chemical, and more.", icon: FaUsers },
];

export default Aboutus;
