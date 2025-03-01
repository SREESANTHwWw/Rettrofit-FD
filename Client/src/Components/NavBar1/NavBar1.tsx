import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoBagRemoveOutline, IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";



import { MdEmail } from "react-icons/md";
import { FetchContext } from "../Contexts/FetchContext";
import axios from "axios";
import { Server } from "../../Server";
import FeaturesSection from "../Body/FeaturesSection";

const NavBar1 = () => {
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

  // useEffect(()=>{
  //   axios.get(`${Server}/get-category`).then((res)=>{
  //     setCategories(res.data.categoryget || []); // Ensure it's an array
  //   }).catch((error)=>{
  //     console.error("Error fetching categories:", error);
  //   })

  // },[])
  const handleCategoryClick = (id: string) => {
    setProductshow1(true);
    axios.get(`${Server}/get-category-product/${id}`).then((res) => {
      setProduct(res.data.productget || []); // Ensure it's an array
    });
  };

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

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
  console.log(categories);
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
        <div className="hidden lg:flex w-full py-2 bg-transparent">
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
            <div
              className={`${
                scolled
                  ? "text-black flex space-x-4 items-center"
                  : "text-white flex space-x-4 items-center"
              } `}
            >
              {/* Phone */}
              <div className="flex items-center space-x-2">
              <button className="px-6 py-2 relative h-[50px] w-40 overflow-hidden bg-emerald-500 rounded-full  text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-800 before:transition-all before:duration-500 hover:text-white hover:before:w-full">
                  <span className="relative z-10">Contact Us</span>
                </button>
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
                  <span className="font-semibold text-md ">
                    info@rettrofit.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={`w-full  sm:bg-transparent ${scolled ? "bg-white shadow-2xl ":"bg-transparent"}  `}  >
          <div className="w-[85%]  mx-auto flex justify-between items-center py-2 relative">
            {/* Logo */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 justify-between ml-12">
              <div className="flex space-x-4">
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

                <button className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500">
                  <span
                    className={`${scolled ? "text-black" : ""} relative z-10`}
                  >
                    Service
                  </span>

                  {/* Dropdown */}
                </button>
                <button
                  onClick={handlerProduct}
                  className="relative h-[50px] flex font-medium justify-center items-center w-30 overflow-hidden text-md bg-transparent text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-emerald-500 rounded-md hover:before:w-2/4 hover:before:bg-emerald-500 hover:after:w-2/4 hover:after:bg-emerald-500"
                >
                  <span
                    className={`${scolled ? "text-black " : ""} relative z-10`}
                  >
                    Products
                  </span>
                </button>

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

              <div className="flex  bg-amber-700 items-center space-x-4">
               
                <button title="Search" className="p-2 rounded-full hover:bg-emerald-400/20 transition-colors duration-300">
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
            <div className="w-full  mx-auto flex justify-between items-center  py-6  relative">
              {
                scolled ?(   <Link to="/" className="lg:hidden">
                  <img src="/retro.png" alt="Logo" className="w-28 h-auto  contrast-200 object-contain hover:scale-105 transition-transform duration-300" />
                </Link>):(    <Link to="/" className="lg:hidden">
    <img src="/retro.png" alt="Logo" className="w-28 h-auto  contrast-200 object-contain hover:scale-105 transition-transform duration-300" />
  </Link>)
              }
         
  {/* Mobile Menu Button */}
  <button className="lg:hidden text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
    {isMenuOpen ? <IoClose className="text-3xl text-teal-500" /> : <IoMenu className="text-3xl text-teal-500" />}
  </button>

  {/* Logo - This should not be duplicated */}
 
</div>

            {/* Mobile Menu */}
            <div
              className={`${
                scolled ? "bg-white" : " bg-white"
              }lg:hidden fixed top-0 right-0 w-full h-screen bg-gray-900/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
                
              <div className="flex flex-col items-center justify-center h-full space-y-4 pt-20">
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
      <div className="    absolute inset-x-0 top-0 -z-10 h-screen ">
        <img
          src="/banner1.jpeg"
          alt="Background"
          className="w-full h-full object-cover  shadow-2xl "
        />
        <div className="absolute inset-0 bg-black/60 flex  justify-end items-center ">
         
          <div className="flex justify-end">
          <div className="w-[80%] mx-auto text-white  animate-op ">
            <h1 className="text-md md:text-5xl text-teal-500 font-medium mb-2">
            Reverse engineering-
            </h1>
            <h1 className="text-xl md:text-5xl font-semibold mb-6">
            Challenges we solve
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
              iste odio corrupti ut aspernatur quisquam mollitia?
            </p>
            
          </div>
          </div>
         
        </div>
        <div className="absolute flex justify-center bottom-5  w-full ">
            <FeaturesSection />
          </div>
      </div>
    </div>
  );
};

export default NavBar1;
