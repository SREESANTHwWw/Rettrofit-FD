import React, { useEffect, useState } from "react";
import NavbarForProduct from "./NavbarForProduct";
import axios from "axios";
import { Server } from "../../Server";
import { useParams } from "react-router-dom";

import Footer from "../Body/Footer";

import { motion } from "framer-motion";



type Product = {
  _id: string;
  productname: string;
  undercategory: string;
  description: string;
  productimages: string[];
  handlerOrder: (item: any) => void;   
}
const ProductView = () => {

  const {id} = useParams()

 const [products ,setProducts] = useState<Product[]>([])

 const [selectedImage, setselectedImage] = useState<string | null>(null);

 const [productname, setProductname] = useState("");
const [name, setName] = useState("");
const [number, setNumber] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [pincode, setPincode] = useState("");
  const [openOrderbox, setOrderBOx] = useState(false);
  const [orersuccess, setOrderSuccess] = useState(false);
 


  useEffect(()=>{
    axios.get(`${Server}/get-One-product/${id}`).then((res)=>{
      setProducts(res.data.productget)

    })

  },[])
  console.log(products)

  const handlerOrder = (item: any) => {
    setOrderBOx(true);
    setProductname(item.productname);

  }

  const placeOrder =(e :React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    axios.post(`${Server}/place-order`,{
      productname,
      name,
      number,
      email,
      address,
      city,
      pincode
    }).then((res)=>{
      if(res.data.msg === "success" ){
        setOrderSuccess(true)
        setOrderBOx(false);
        setTimeout(() => {
          setOrderSuccess(false);
          
        }, 4000);
      }
      else{
        alert("Something went wrong")
      }
    }),{
  
  
  }
}

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 -z-50 scroll-smooth">
      {/* Navbar */}
      <NavbarForProduct />

      {/* Main Container */}
      <div className="container mx-auto p-6">
      {products.map((item: any) => (
        <div key={item._id} className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow-lg">
          
          {/* Image Gallery */}
          <div className="flex">
            {/* Sidebar Images */}
            <div className="flex flex-col space-y-3">
              {item.productimages.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={()=>setselectedImage(img)}
                  className="w-16 h-20 object-cover rounded-md cursor-pointer border border-gray-200 hover:border-gray-500"
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 flex justify-center">
              <img className="w-full max-w-md rounded-lg object-cover" src={  selectedImage || item.productimages[0]} alt={item.productname} />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-8">
  {/* Product Name */}
   
  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
    {item.productname}
  </h1>

  {/* Description with Read More Functionality */}
  <div className="relative">
    <p className="text-black font-semibold mb-2">Product Description</p>
    <p className="text-gray-600 leading-relaxed line-clamp-3 transition-all duration-300">
      {item.description}
    </p>
    {/* Optional "Read More" button */}
    
  </div>

  {/* Add to Cart Button */}
  <button
    className="px-6 py-2 relative h-[50px] w-40 overflow-hidden bg-emerald-500 rounded-full  text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-800 before:transition-all before:duration-500 hover:text-white hover:before:w-full"
    onClick={() => handlerOrder(item)} >
   <span className="relative z-10"  >Buy Now</span>
  </button>
</div>
        </div>
      ))}
    </div>
    {openOrderbox && (
  <div className="fixed inset-0 bg-gray-800/40 backdrop-blur-sm flex justify-center items-center z-40 px-4">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
      {/* Title */}
      <div className="w-full flex justify-center mb-6">
        <h1 className="text-2xl md:text-3xl text-teal-600 font-semibold">Order Details</h1>
      </div>

      {/* Form Inputs */}
      <form className="space-y-4" onSubmit={placeOrder}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your Phone number"
            className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
          type="text"
          placeholder="Enter your Address"
          className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
          onChange={(e) => setAddress(e.target.value)}
        />
          <input
          type="email"
          placeholder="Enter your Email"
          className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Enter your City"
            className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your Pincode"
            className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

        {/* Order Button */}
        <button type="submit" className="w-full mt-4 p-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-200">
          Place Order
        </button>
      </form>
    </div>
  </div>
)}

     {orersuccess && (
      <div className="fixed inset-0 flex bg-teal-500 justify-center items-center z-50">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white p-6 rounded-xl shadow-xl text-center"
        >
          <h2 className="text-2xl font-bold text-teal-600">Order Successful!</h2>
          <p className="text-gray-600">Check your email for details.</p>

          {/* Delivery Animation */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-4 flex justify-center"
          >
            <img
              src="/download.gif"
              alt="Delivery Animation"
              className="w-40 h-40"
            />
          </motion.div>
        </motion.div>
      </div>
    )}



    <div className="container mx-auto w-full ">
    <Footer/>
    </div>
    
   
    </div>
  );
};

export default ProductView;
