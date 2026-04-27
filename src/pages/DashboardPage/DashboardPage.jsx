import { Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./DashboardPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { useState } from "react";

function DashboardPage() {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar className={styles.sidebar}></Sidebar>
      <section className={styles.mainContent}>
        <DashboardNavbar
          searchValue={searchQuery}
          searchOnChange={setSearchQuery}
        />
        <Outlet context={searchQuery} />
      </section>
    </div>
  );
}

export default DashboardPage;
