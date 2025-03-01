

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { IoBagRemoveOutline, IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";

import { FaPhone } from "react-icons/fa6";


import { MdEmail } from 'react-icons/md';
const NavbarForProduct = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
    const [scolled, setScrolled] = useState<Boolean>(false);
    const [productshow, setProductshow] = useState<Boolean>(false);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 30) {
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
<div className={`${scolled ? " z-30 bg-blue-700  rounded-b-[20px]":"container mx-auto rounded-b-[20px] bg-blue-800 p-2 md:flex md:gap-8"} `}>
  <div
        className={`${
          scolled
            ? "  bg-blue-800 fixed w-full transition ease-in duration-300 rounded-b-[20px] shadow-2xl "
            : "  w-full "
        }`}
        // className="w-full shadow-2xl fixed bg-white"
      >
       <div className="hidden lg:flex w-full py-2 ">
      <div className="w-[75%] mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/">
          <img
            src="/retro.png"
            alt="Logo"
            className={`${
              scolled ? "filter brightness-0 invert" : "filter brightness-0 invert"
            } w-24 h-14 object-contain hover:scale-105 transition-transform duration-300`}
          />
        </Link>

        {/* Contact Information Section */}
        <div className={`${scolled ? " flex space-x-4 items-center":"text-white flex space-x-4 items-center"} `}>
          
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
        <nav className="w-full  ">
          <div className="w-[80%] mx-auto flex justify-between items-center py-2 relative">
            {/* Logo */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-between ml-12">
              <div className="flex space-x-6">
                <Link
                  to={"/"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? " " : ""} relative z-10`}
                  >
                    Home
                  </span>
                </Link>
            
                <button
                  onClick={handlerProduct}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "" : ""} relative z-10`}
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
                    className={`${scolled ? " " : ""} relative z-10`}
                  >
                    Products
                  </span>
                </Link>

                <Link
                  to={"/contactus"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? " " : ""} relative z-10`}
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
                    className={`${scolled ? " " : ""} relative z-10`}
                  >
                    About
                  </span>
                </Link>
                <Link
                  to={"/faq"}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? " " : ""} relative z-10`}
                  >
                    FAQ
                  </span>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-emerald-400/20 transition-colors duration-300">
                  <IoBagRemoveOutline
                    className={`text-2xl ${
                      scolled ? "" : "text-white"
                    }  hover:text-emerald-400`}
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-emerald-400/20 transition-colors duration-300">
                  <IoSearch
                    className={`text-2xl ${
                      scolled ? "" : "text-white"
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
                <div className="flex space-x-4 mt-8">
                  <button className="p-2">
                    <IoBagRemoveOutline className="text-2xl text-white hover:text-emerald-400" />
                  </button>
                  <button className="p-2">
                    <IoSearch className="text-2xl text-white hover:text-emerald-400" />
                  </button>
                </div>
                <button className="px-8 py-3 relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500">
                  <span
                    className={`${scolled ? " " : ""} relative z-10`}
                  >
                    Get A Life
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
</div>
  )
}
export default NavbarForProduct