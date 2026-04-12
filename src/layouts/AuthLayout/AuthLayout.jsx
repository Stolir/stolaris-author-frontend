import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
}

export default AuthLayout;
