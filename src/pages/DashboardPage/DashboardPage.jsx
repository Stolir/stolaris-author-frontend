import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./DashboardPage.module.css";
import { useSearch } from "../../hooks/useSearch";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";

function DashboardPage() {
  const { user } = useAuth();

  const { searchQuery, setSearchQuery, searchError } = useSearch();

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar className={styles.sidebar}></Sidebar>
      <section className={styles.mainContent}>
        <DashboardNavbar
          searchValue={searchQuery}
          searchOnChange={setSearchQuery}
        />
        <Outlet />
      </section>
    </div>
  );
}

export default DashboardPage;
