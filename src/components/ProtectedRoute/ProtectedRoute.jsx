import { Navigate, Outlet } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
}

export default ProtectedRoute;
