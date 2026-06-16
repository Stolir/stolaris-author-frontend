import { Navigate, Outlet } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { useCallback, useEffect } from "react";
import { getUser } from "@/lib/serverRequests";

function ProtectedRoute() {
  const { login, logout, loading, user } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
}

export default ProtectedRoute;
