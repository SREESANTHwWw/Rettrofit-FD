import { FaTools, FaLandmark, FaShieldAlt } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const features = [
  { icon: <FaTools size={40} />, title: "Integrity", text: "Taking seamless key performance indicators offline to maximize the tail processes." },
  { icon: <MdOutlineError size={40} />, title: "Damaged Parts", text: "Original manufacturers may no longer produce critical pump spares or shafts." },
  { icon: <FaLandmark size={40} />, title: "Tradition", text: "Dramatically visualize customer directed convergence without revolutionary ROI." },
  { icon: <FaShieldAlt size={40} />, title: "Safety", text: "Assertively iterate resource maximizing products after leading intellectual capital." },
];

// Slick carousel settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Show 3 slides on desktop
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024, // Tablets
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640, // Mobile
      settings: { slidesToShow: 1 },
    },
  ],
};

const FeaturesSection = () => {
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Carousel */}
      <Slider {...settings}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 rounded-xl shadow-lg flex justify-center  backdrop-blur-md transition-transform"
          >
            <div className="text-emerald-500 mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-bold text-white">{feature.title}</h3>
            <div className="w-12 h-1 bg-emerald-500 mx-auto my-2"></div>
            <p className="text-teal-500">{feature.text}</p>
          </motion.div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default FeaturesSection;
