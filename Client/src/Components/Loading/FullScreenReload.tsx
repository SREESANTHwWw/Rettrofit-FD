import { useEffect } from "react";
import { motion } from "framer-motion";

import {  Truck } from "lucide-react";

const FullScreenReload = () => {
  // const [show, setShow] = useState(true);
  const show = true

  useEffect(() => {
    setTimeout(() => {
      window.location.reload(); // Reload the page
    }, 1500);
  }, []);

  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <motion.div
          animate={{ translateX: 160 }}
          transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
        >
          < Truck  className="w-11 h-11 text-teal-500" />
        </motion.div>
      </div>
    )
  );
};

export default FullScreenReload;
