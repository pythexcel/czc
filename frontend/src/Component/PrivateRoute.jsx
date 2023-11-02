import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth_token");
  return isAuthenticated ? [ children ]: <Navigate to="/"  />;
};

export default PrivateRoute;
