import { useNavigation } from "react-router";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import { getUser } from "./lib/serverRequests";

function AppContent() {
  const { login, logout, loading, user } = useAuth();
  useEffect(() => {
    let ignored = false;
    (async () => {
      const user = await getUser();
      if (ignored) return;
      if (user) {
        login(user);
      } else {
        logout();
      }
    })();
    return () => (ignored = true);
  }, [login, logout]);

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
