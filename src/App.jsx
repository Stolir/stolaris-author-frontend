import { useLoaderData } from "react-router";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";

function AppContent() {
  const data = useLoaderData();
  const { login, loading, setLoading, user } = useAuth();
  // console.log(data);
  useEffect(() => {
    if (data.user) {
      login(data.user);
    } else {
      setLoading(false);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;

  return user ? <AuthLayout /> : <PublicLayout />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
