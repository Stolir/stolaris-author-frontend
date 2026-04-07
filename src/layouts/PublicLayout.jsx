import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function PublicLayout() {
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

export default PublicLayout;
