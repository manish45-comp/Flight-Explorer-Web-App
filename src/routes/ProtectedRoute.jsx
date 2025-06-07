import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/unauthorized" />;

  return children;
};
export default ProtectedRoute;
