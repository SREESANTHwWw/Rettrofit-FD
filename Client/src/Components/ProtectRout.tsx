import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
  exp?: number; 
  // Token expiration timestamp
}

interface ProtectedRouteProps {
  children: ReactNode;
  allowedTypes?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedTypes }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found, redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log("Decoded Token:", decoded);

    if (!decoded.role) {
      console.log("No role found in token, redirecting to login.");
      return <Navigate to="/login" replace />;
    }

    if (allowedTypes && !allowedTypes.includes(decoded.role)) {
      console.log("Role not allowed:", decoded.role);
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
