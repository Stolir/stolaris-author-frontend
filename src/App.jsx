import { Outlet, useLoaderData } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function AppContent() {
  const data = useLoaderData();
  const { login, loading, setLoading } = useAuth();
  // console.log(data);
  useEffect(() => {
    if (data.user) {
      login(data.user);
    } else {
      setLoading(false);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <main className="mainContent">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
