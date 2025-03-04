

import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import Login from '../Admin/Login/Login';
interface DecodedToken {
    role?: string;
    exp?: number; 
    // Token expiration timestamp
  }

const LoginRedirect = () => {
    const tokenData = localStorage.getItem("token");
    let decodedToken: DecodedToken = {};
  try {
    if (tokenData) {
        decodedToken = jwtDecode<DecodedToken>(tokenData);
    } else {
       return <Login/>
    }
  } catch (error) {
    console.error("Invalid token:", error);
   
  }

  if(decodedToken.role === "admin") return <Navigate to="/admin/dashboard" />



}

export default LoginRedirect