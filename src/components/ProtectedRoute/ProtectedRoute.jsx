import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
}

export default ProtectedRoute;
