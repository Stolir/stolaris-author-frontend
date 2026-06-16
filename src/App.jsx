import { Outlet, useNavigation } from "react-router";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { useCallback, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

import { getUser } from "./lib/serverRequests";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";

function AppContent() {
  const { login, logout, loading, user } = useAuth();

  const checkSessionValidity = useCallback(async () => {
    const userData = await getUser();
    if (userData) {
      login(userData);
    } else {
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    checkSessionValidity();
    document.addEventListener("visibilitychange", checkSessionValidity);
    return () =>
      document.removeEventListener("visibilitychange", checkSessionValidity);
  }, [checkSessionValidity]);

  if (loading) return <LoadingSpinner />;

  return user ? <AuthLayout /> : <PublicLayout />;
}

function App() {
  const navigation = useNavigation();

  return (
    <AuthProvider>
      {navigation.state === "loading" && <LoadingSpinner />}
      <AppContent />
    </AuthProvider>
  );
}

export default App;
