import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import { FetchContext } from "../Contexts/FetchContext";
import axios from "axios";
import { Server } from "../../Server";


const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
  const [scolled, setScrolled] = useState<Boolean>(false);
  const [productshow, setProductshow] = useState<Boolean>(false);

  const [product, setProduct] = useState([]);
  const [productshow1, setProductshow1] = useState<Boolean>(false);
  const navigate = useNavigate();

  const context = useContext(FetchContext)?.categories ?? [];

  const categories = context;

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

  const handleCategoryClick = (id: string) => {
    setProductshow1(true);
    axios.get(`${Server}/get-category-product/${id}`).then((res) => {
      setProduct(res.data.productget || []); // Ensure it's an array
    });
  };

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  // const navLinks = [
  //   { name: "Home", path: "/home" },
  //   { name: "Products", path: "/products" },
  //   { name: "Service", path: "/services" },
  //   { name: "Contactus", path: "/contactus" },
  //   { name: "About", path: "/about" },
  //   { name: "FAQ", path: "/faq" },
  // ];

  const handlerProduct = () => {
  
    setProductshow(true);
    
  };
  const handlerSMProduct =()=>{
  setProductshow((prev) => !prev);
 
  }
  console.log(categories);
  return (
    <div className="w-full bg-transparent  relative z-10">
      {/* Top Contact Bar */}
      <div
        className={`${
          scolled
            ? "sm:bg-white bg-transparent fixed w-full transition ease-in duration-300 rounded-b-[20px] shadow-2xl "
            : ""
        }`}
      >
        <div className="hidden lg:flex w-full py-2 bg-transparent">
          <div className="w-[85%] mx-auto flex justify-between items-center">
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
            <div
              className={`${
                scolled
                  ? "text-black flex space-x-4 items-center"
                  : "text-white flex space-x-4 items-center"
              } `}
            >
              {/* Phone */}
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 relative h-[45px] w-24 overflow-hidden bg-teal-500 rounded-full  text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-800 before:transition-all before:duration-500 hover:text-white hover:before:w-full">
                  <span className="relative z-10">Contact</span>
                </button>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-2">
                <FaMapLocation className="text-emerald-400 text-3xl" />
                <div className="flex flex-col">
                  <span className="text-sm">Come & Visit us</span>
                  <span className="font-semibold text-md">Covai Tech Park</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <MdEmail className="text-emerald-400 text-3xl" />
                <div className="flex flex-col">
                  <span className="text-sm">Email us</span>
                  <span className="font-semibold text-md ">
                    info@rettrofit.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          className={`w-full  sm:bg-transparent ${
            scolled ? "bg-white shadow-2xl " : "bg-transparent"
          }  `}
        >
          <div className="w-[90%]  mx-auto flex justify-between items-center py-2 relative">
            {/* Logo */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 justify-between ml-12">
              <div className="flex space-x-4">
                <Link
                  to={"/"}
                  className="relative h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Home
                  </span>
                </Link>

                <button className="relative h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800">
                  <span
                    className={`${scolled ? "text-black" : ""} relative z-10`}
                  >
                    Service
                  </span>

                  {/* Dropdown */}
                </button>
                <button
                  onClick={handlerProduct}
                  className="relative h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Products
                  </span>
                </button>

                <Link
                  to={"/contactus"}
                  className="relative h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Contactus
                  </span>
                </Link>
                {productshow && (
                  <div
                    className="absolute top-[4.5rem] z-40 left-[300px] w-48 bg-white shadow-lg rounded-md border text-black "
                    onMouseEnter={handlerProduct}
                    onMouseLeave={() => setProductshow(false)}
                  >
                    <ul className="space-y-2">
                      {categories.map((item: any) => (
                        <li
                          key={item._id}
                          className="hover:bg-emerald-100 p-2 rounded-md transition-colors duration-200"
                          onMouseEnter={() => handleCategoryClick(item._id)}
                        >
                          {item.categoryname}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {productshow1 && (
                  <div
                    className="absolute top-[5.5rem] left-[492px] w-48 border bg-white shadow-lg  rounded-md text-black z-20"
                    onMouseEnter={handlerProduct}
                    onMouseLeave={() => setProductshow1(false)}
                  >
                    <ul className="space-y-2">
                      {product.map((item: any) => (
                        <li
                          key={item._id}
                          className="hover:bg-emerald-100 p-2 rounded-md transition-colors duration-200"
                          onClick={() => handleProductClick(item._id)}
                        >
                          {item.productname}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  to={"/about"}
                  className="relative h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    About
                  </span>
                </Link>
                <Link
                  to={"/faq"}
                  className="relative h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    FAQ
                  </span>
                </Link>
              </div>

              <div className="flex w-[300px] justify-end  items-center space-x-4">
                <button
                  title="Search"
                  className="p-2 rounded-full hover:bg-emerald-400/20 transition-colors duration-300"
                >
                  <IoSearch
                    className={`text-2xl ${
                      scolled ? "text-black" : "text-white"
                    }  hover:text-emerald-400`}
                  />
                </button>
              </div>
            </div>
            {/*Change here the icon green for SM}
            {/* Mobile Menu Button */}
            <div className="w-full  mx-auto flex justify-between items-center   py-6  relative">
              {scolled ? (
                <Link to="/" className="lg:hidden">
                  <img
                    src="/retro.png"
                    alt="Logo"
                    className="w-28 h-auto  contrast-200 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              ) : (
                <Link to="/" className="lg:hidden">
                  <img
                    src="/retro.png"
                    alt="Logo"
                    className="w-28 h-auto  contrast-200 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                   <IoMenu className="text-3xl text-teal-500" />
               
                ) : (
                  <IoClose className="text-3xl text-teal-500" />
                )}
              </button>

              {/* Logo - This should not be duplicated */}
            </div>

            {/* Mobile Menu */}
            <div
    className={`lg:hidden fixed   w-[23rem] left-3 h-[300px] bg-white rounded-2xl ${
      isMenuOpen ? "hidden fade-in-right-normal" : " absolute top-28 fade-in-right-normal "
    }`}
  >
    <div className="flex flex-col  justify-center p-10 h-full space-y-4 ">
      <Link
        to="/"
        className=""
        onClick={() => setIsMenuOpen(false)}
      >
        <span>Home</span>
      </Link>

<div>
  <button
    className=""
    onClick={() => setIsMenuOpen(false)}
  >
    <span>Service</span>
  </button>
</div>
     

      {/* Product button with nested dropdown */}
      <div className="w-full bg-teal-600">
        <button
          onClick={handlerSMProduct}
          className=""
        >
          <span>Product</span>
        </button>
        {productshow && (
          <div className="  bg-red-900">
    <div className="mt-2 absolute w-[300px] border-1 border-gray-500 fade-in-right-normal bg-white shadow-lg rounded-md z-20 text-black">
            <ul className="space-y-2 p-2">
              {categories.map((item:any) => (
                <li
                  key={item._id}
                  className="hover:bg-emerald-100 p-2 rounded-md transition-colors duration-200 cursor-pointer"
                  onClick={() => handleCategoryClick(item._id)}
                >
                  {item.categoryname}
                </li>
              ))}
            </ul>
          </div>
          </div>
      
        )}
      </div>

      {/* Sub-product dropdown (if needed) */}
      {productshow1 && (
        <div className="w-30 bg-white absolute shadow-lg fade-in-right-normal rounded-md z-20 text-black p-2 mt-2">
          <ul className="space-y-2">
            {product.map((item:any) => (
              <li
                key={item._id}
                className="hover:bg-emerald-100 p-2 rounded-md transition-colors duration-200 cursor-pointer"
                onClick={() => handleProductClick(item._id)}
              >
                {item.productname}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/home"
        className=""
        onClick={() => setIsMenuOpen(false)}
      >
        <span>About</span>
      </Link>

      <Link
        to="/faq"
        className=""
        onClick={() => setIsMenuOpen(false)}
      >
        <span>FAQ</span>
      </Link>

      <Link
        to="/contactus"
        className=""
        onClick={() => setIsMenuOpen(false)}
      >
        <span className={`${scolled ? "text-black" : ""} relative z-10`}>
          Contact
        </span>
      </Link>
    </div>
  </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="  absolute inset-x-0 top-0  -z-10 h-[800px] ">
        <img
          src="/product-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover  shadow-2xl "
        />
        <div className="absolute inset-0 bg-black/60  flex items-center mt-40  rounded-br-[200px]">
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
