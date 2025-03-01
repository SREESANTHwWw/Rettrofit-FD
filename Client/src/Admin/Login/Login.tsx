import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";
import axios from "axios";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${Server}/login-admin`, {
        username,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
     
        toast.success("Login success");
   

        // navigate("/admin/dash")
      }).catch((err)=>{
        console.log(err)
        toast.error(err.response.data.msg)
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full sm:w-[500px] sm:h-[500px] h-screen flex flex-col items-cente justify-center   bg-white p-8 rounded-lg shadow-lg ">
        <div className="text-center mb-8">
          <span className="text-2xl text-blue-950 font-semibold">
            Welcome Back
          </span>
          <p className="text-gray-500 mt-2">Login to your Account</p>
        </div>
        <div className=" grid grid-cols-1 items-center ">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900" />
              <input
                className="w-full h-12 pl-12 pr-4 rounded-md shadow-lg border focus:border-blue-950 outline-none placeholder:text-gray-500"
                type="text"
                placeholder="Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>

            <div className="mb-6 relative">
              <RiLock2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900" />
              <input
                className="w-full h-12 pl-12 pr-12 rounded-md shadow-lg border focus:border-blue-950 outline-none placeholder:text-gray-500"
                type={visible ? "text" : "password"}
                placeholder="Password"
                minLength={8}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {visible ? (
                <AiOutlineEye
                  size={25}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={25}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>

            <div className="mb-6 flex flex-col gap-4">
              <button className="w-full h-12 bg-emerald-500 text-white rounded-md shadow-xl hover:bg-blue-800 transition-all duration-300">
                <IoArrowForwardOutline size={20} className="inline mr-2" />
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
