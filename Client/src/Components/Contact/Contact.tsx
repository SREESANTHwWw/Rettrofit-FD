import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { IoBagRemoveOutline, IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";

import { FaPhone } from "react-icons/fa6";


import { MdEmail } from 'react-icons/md';

const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scolled, setScrolled] = useState<boolean>(false);
  const [productshow, setProductshow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/products" },
    { name: "Service", path: "/services" },
    { name: "Contactus", path: "/contactus" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
  ];

  const handlerProduct = () => {
    setProductshow(true);
  };

  return (
    <div className="w-full bg-transparent relative z-10">
      {/* Top Contact Bar */}
      <div
        className={`${
          scolled
            ? "sm:bg-white bg-transparent fixed w-full transition ease-in duration-300 rounded-b-[20px] shadow-2xl "
            : ""
        }`}
      >
       <div className="hidden lg:flex w-full py-4 bg-transparent">
      <div className="w-[75%] mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/">
          <img
            src="/retro.png"
            alt="Logo"
            className={`${
              scolled ? "contrast-150" : "filter brightness-0 invert"
            } w-32 h-20 object-contain hover:scale-105 transition-transform duration-300`}
          />
        </Link>

        {/* Contact Information Section */}
        <div className={`${scolled ? "text-black flex space-x-4 items-center":"text-white flex space-x-4 items-center"} `}>
          
          {/* Phone */}
          <div className="flex items-center space-x-2">
            <FaPhone className="text-emerald-400 text-3xl" />
            <div className="flex flex-col">
              <span className="text-sm">Give us a call</span>
              <span className="font-semibold text-md">+91 9567641722</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-2">
            <FaMapLocation className="text-emerald-400 text-3xl" />
            <div className="flex flex-col">
              <span className="text-sm">Come & Visit us</span>
              <span className="font-semibold text-md">
                Covai Tech Park, Coimbatore 641014
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2">
            <MdEmail className="text-emerald-400 text-3xl" />
            <div className="flex flex-col">
              <span className="text-sm">Email us</span>
              <span
                
                className="font-semibold text-md "
              >
                info@rettrofit.com
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>

        {/* Main Navigation */}
        <nav className="w-full  bg-transparent ">
          <div className="w-[80%] mx-auto flex justify-between items-center py-4 relative">
            {/* Logo */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex  items-center space-x-8 flex-1 justify-between ml-12">
              <div className="flex space-x-6">
                <Link
                  to={"/"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Home
                  </span>
                </Link>
            
                <button
                  onClick={handlerProduct}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "text-black" : ""} relative z-10`}
                  >
                    Service
                  </span>

                  {/* Dropdown */}
                </button>
                <Link
                  to={"/products"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Products
                  </span>
                </Link>

                <Link
                  to={"/contactus"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Contactus
                  </span>
                </Link>
                {productshow && (
                  <div
                    className="absolute  top-[4.5rem] left-[300px] w-48 bg-white shadow-lg rounded-md  text-black z-20"
                    onMouseEnter={handlerProduct}
                    onMouseLeave={() => setProductshow(false)}
                  >
                    <ul className="space-y-2">
                      <li className="hover:bg-emerald-100 p-2 rounded-md transition-colors duration-200">
                        <Link to="/service/web-development">
                          Web Development
                        </Link>
                      </li>
                      <li className="hover:bg-emerald-100 p-2 rounded-md transition-colors duration-200">
                        <Link to="/service/mobile-apps">Mobile Apps</Link>
                      </li>
                      <li className="hover:bg-emerald-100 p-2 rounded-md transition-colors duration-200">
                        <Link to="/service/seo">SEO Optimization</Link>
                      </li>
                    </ul>
                  </div>
                )}
                <Link
                  to={"/about"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    About
                  </span>
                </Link>
                <Link
                  to={"/faq"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    FAQ
                  </span>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <button title="Remove Bag" className="p-2 rounded-full hover:bg-emerald-400/20 transition-colors duration-300">
                  <IoBagRemoveOutline
                    className={`text-2xl ${
                      scolled ? "text-black" : "text-white"
                    }  hover:text-emerald-400`}
                  />
                </button>
                <button title="Search" className="p-2 rounded-full hover:bg-emerald-400/20 transition-colors duration-300">
                  <IoSearch
                    className={`text-2xl ${
                      scolled ? "text-black" : "text-white"
                    }  hover:text-emerald-400`}
                  />
                </button>
                <button className="px-6 py-2 relative h-[50px] w-40 overflow-hidden bg-emerald-500 rounded-full  text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-800 before:transition-all before:duration-500 hover:text-white hover:before:w-full">
                <span className="relative z-10">Contact Us</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <IoClose className="text-3xl" />
              ) : (
                <IoMenu className="text-3xl" />
              )}
            </button>

            {/* Mobile Menu */}
            <div
              className={`${
                scolled ? "bg-transparent" : ""
              }lg:hidden fixed top-0 right-0 w-full h-screen bg-gray-900/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex space-x-6 mt-8">
                  <button className="p-2" title="Remove Bag">
                    <IoBagRemoveOutline className="text-2xl text-white hover:text-emerald-400" />
                  </button>
                  <button className="p-2" title="Search">
                    <IoSearch className="text-2xl text-white hover:text-emerald-400" />
                  </button>
                </div>
                <button className="px-8 py-3relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500">
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Get A Life
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="  absolute inset-x-0 top-0 bg-black/40 -z-10 h-[800px] ">
        <img
          src="/product-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover shadow-2xl "
        />
        <div className="absolute inset-0  flex items-center mt-40  rounded-br-[200px]">
          <div className="w-[80%] mx-auto text-white animate-op ">
          
      <div className="relative max-w-8xl  w-full bg-transparent p-10">
        <h1 className="text-4xl font-bold text-white mb-6">Let's get in touch!</h1>

        <div className="grid =  grid-cols-1 justify-item-between md:grid-cols-2 gap-8">
          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="text-white block mb-2">Name</label>
              <input type="text" placeholder="Enter your name" 
                className="w-full p-3 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            </div>

            <div>
              <label className="text-white block mb-2">Email</label>
              <input type="email" placeholder="Enter your email" 
                className="w-full p-3 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            </div>

            <div>
              <label className="text-white block mb-2">Contact Number</label>
              <input type="tel" placeholder="Enter your contact number" 
                className="w-full p-3 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            </div>

            <div>
              <label className="text-white block mb-2">Service</label>
              <label htmlFor="service" className="text-white block mb-2">Service</label>
              <select id="service" className="w-full p-3 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option className="bg-gray-900 text-white" value="" disabled selected>Select a service</option>
                <option className="bg-gray-900 text-white" value="web-design">Web Design</option>
                <option className="bg-gray-900 text-white" value="development">Development</option>
                <option className="bg-gray-900 text-white" value="seo">SEO Optimization</option>
              </select>
            </div>

            <button 
              className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md transition">
              Submit
            </button>
          </form>

      
      
        </div>
      </div>
 
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Contact;
