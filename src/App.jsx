import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="mainContent">
        <Outlet />
      </main>
    </>
  );
}

export default App;
