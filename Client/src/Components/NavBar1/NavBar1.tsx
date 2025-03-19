import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import { FetchContext } from "../Contexts/FetchContext";
import axios from "axios";
import { Server } from "../../Server";
import FeaturesSection from "../Body/FeaturesSection";
import _ from "lodash";

const NavBar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
  const [scolled, setScrolled] = useState<Boolean>(false);
  const [productshow, setProductshow] = useState<Boolean>(false);

  const [product, setProduct] = useState([]);
  const [productshow1, setProductshow1] = useState<Boolean>(false);
  // const [servicesData, setServicesData] = useState([]);
  const [ViewService, setViewService] = useState<Boolean>(false);
  const [underServiceData, setUnderServiceData] = useState([]);
  const [service, setservice] = useState<Boolean>(false);
  const navigate = useNavigate();

  const context = useContext(FetchContext)?.categories ?? [];

  const serviceContext = useContext(FetchContext)?.servicesData ?? [];
  const categories = context;
  const servicesData = serviceContext;
  console.log(servicesData);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    const throttedScroll = _.throttle(handleScroll, 100);
    window.addEventListener("scroll", throttedScroll);
    return () => {
      window.removeEventListener("scroll", throttedScroll);
    };
  }, []);

  const handleServiceUnderClick = (id: string) => {
    setViewService(true);
    axios.get(`${Server}/get-underService/${id}`).then((res) => {
      setUnderServiceData(res.data.serviceget);
    });
  };

  const handleCategoryClick = (id: string) => {
    setProductshow1(true);
    axios.get(`${Server}/get-category-product/${id}`).then((res) => {
      setProduct(res.data.productget || []); // Ensure it's an array
    });
  };

  const handlerservice = () => {
    setservice(true);
  };
  const handleProductClick = (item: any) => {
    const categoryId = item.undercategory; // Store in a local variable
    const productId = item._id;

  
    navigate(`/products/${categoryId}/${productId}`); // Use local variables
  };
  

  const handleServiceClick = (item:any) => {
    const mainService_id =(item.underService)
    const service_id  =(item._id)

    navigate(`/services/${mainService_id}/${service_id }`);
  };

  const handlerserviceopen = () => {
    setservice(true);
    setProductshow(false);
    setProductshow1(false);
  };

  const categoryProductClose = () => {
    setProductshow(false);
    // setProductshow1(false);
  };

  const handlerProduct = () => {
    setProductshow(true);
    setservice(false);
  };
  const handlerSMProduct = () => {
    setProductshow((prev) => !prev);
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

                <button
                  className="relative cursor-pointer h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800"
                  onClick={handlerserviceopen}
                >
                  <span
                    className={`${scolled ? "text-black" : ""} relative z-10`}
                  >
                    Service
                  </span>

                  {/* Dropdown */}
                </button>
                {service && (
                  <div
                    className="absolute top-[3.7rem] z-40 left-[185px] w-52 bg-white shadow-lg rounded-md border text-black "
                    onMouseEnter={handlerservice}
                    onMouseLeave={() => setservice(false)}
                  >
                    <ul className="space-y-2 p-1">
                      {servicesData.map((item: any) => (
                        <li
                          key={item._id}
                          className="gap-2 text-md hover:underline-offset-8 font-medium p-2 rounded-md transition-colors duration-200 hover:underline cursor-pointer hover:decoration-teal-500"
                          onMouseEnter={() => handleServiceUnderClick(item._id)}
                        >
                          {item.servicename}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {ViewService && (
                  <div
                    className="absolute top-[5rem] z-40 left-[394px] w-64 bg-white shadow-lg rounded-md border text-black "
                    onMouseLeave={() => setViewService(false)}
                  >
                    <ul className="space-y-2">
                      {underServiceData.map((item: any) => (
                        <li
                          key={item._id}
                          className="gap-2 text-md hover:underline-offset-8 font-medium p-2 rounded-md transition-colors duration-200 hover:underline cursor-pointer hover:decoration-teal-500"
                          onClick={() => handleServiceClick(item)}
                        >
                          {item.servicename}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={handlerProduct}
                  className="relative cursor-pointer h-[45px] flex font-medium bg-teal-500 justify-center items-center w-30 overflow-hidden text-md  text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  rounded-md hover:before:w-2/4 hover:before:bg-blue-800 hover:after:w-2/4 hover:after:bg-blue-800"
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
                    className="absolute top-[3.7rem] z-40 left-[320px]  w-full max-w-[250px] bg-white shadow-lg rounded-md border text-black "
                    onMouseEnter={handlerProduct}
                    onMouseLeave={categoryProductClose}
                  >
                    <ul className="space-y-2">
                      {categories.map((item: any) => (
                        <li
                          key={item._id}
                          className="gap-2 text-[16px] font-medium hover:underline-offset-8 p-2 rounded-md transition-colors duration-200 hover:underline cursor-pointer hover:decoration-teal-500"
                          onMouseEnter={() => handleCategoryClick(item._id)}
                          style={{ fontFamily: "Red Hat Display, sans-serif" }}
                        >
                          {item.categoryname}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {productshow1 && (
                  <div
                    className="absolute top-[5rem] left-[570px] z  w-full max-w-xs border bg-white shadow-lg  rounded-md text-black z-50"
                    onMouseEnter={handlerProduct}
                    onMouseLeave={() => setProductshow1(false)}
                  >
                    <ul className="space-y-2">
                      {product.map((item: any) => (
                        <li
                          key={item._id}
                          className="gap-2 text-md hover:underline-offset-8 font-medium p-2 rounded-md transition-colors duration-200 hover:underline cursor-pointer hover:decoration-teal-500"
                          onClick={() => handleProductClick(item)}
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
            <div className="w-full  mx-auto flex justify-between items-center  py-6  relative">
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
              className={`lg:hidden fixed  w-[23rem] left-3 h-[300px] bg-white rounded-2xl ${
                isMenuOpen
                  ? "hidden fade-in-right-normal"
                  : " absolute top-28 fade-in-right-normal "
              }`}
            >
              <div className="flex flex-col justify-center p-10 h-full space-y-4 ">
                <Link to="/" className="" onClick={() => setIsMenuOpen(false)}>
                  <span>Home</span>
                </Link>

                <div>
                  <button className="" onClick={() => setIsMenuOpen(false)}>
                    <span>Service</span>
                  </button>
                </div>

                {/* Product button with nested dropdown */}
                <div className="w-full bg-teal-600">
                  <button onClick={handlerSMProduct} className="">
                    <span>Product</span>
                  </button>
                  {productshow && (
                    <div className="  bg-red-900">
                      <div className="mt-2 absolute w-[300px] border-1 border-gray-500 fade-in-right-normal bg-white shadow-lg rounded-md z-20 text-black">
                        <ul className="space-y-2 p-2">
                          {categories.map((item: any) => (
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
                      {product.map((item: any) => (
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
                  <span
                    className={`${scolled ? "text-black" : ""} relative z-10`}
                  >
                    Contact
                  </span>
                </Link>
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
        <div className="absolute  inset-0 bg-black/60 flex   justify-end items-center ">
          <div className="sm:flex hidden justify-end ">
            <div className="w-[80%] mx-auto  text-white  animate-op ">
              <h1 className="text-md  md:text-5xl text-teal-500 font-medium mb-2">
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
          <div className="flex  sm:hidden justify-end mb-24 ">
            <div className="w-[80%] mx-auto  text-white  animate-op ">
              <h1 className="text-md text-5xl md:text-5xl text-teal-500 font-medium ">
                Reverse engineering-
              </h1>
              <h1 className=" text-5xl md:text-5xl font-semibold mb-6">
                Challenges we solve
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                iste odio corrupti ut aspernatur quisquam mollitia?
              </p>
            </div>
          </div>
        </div>
        <div className="absolute  flex  top-[60%] w-full ">
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
};

export default NavBar1;
