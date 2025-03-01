// import { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";

// interface ProtectedRouteProps {
//   children: ReactNode;
//   allowedTypes?: string[]; // Optional array of allowed roles
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedTypes }) => {
//   const tokenData = localStorage.getItem("token");
//   const decodedToken = jwtDecode(tokenData);

//   if (!decodedToken) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check if the role is allowed
//   if (allowedTypes && !allowedTypes.includes(decodedToken.role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

