import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./AuthLayout.module.css";
import { useSearch } from "../../hooks/useSearch";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import SidebarItem from "../../components/SidebarItem/SidebarItem";
import { Book, GraphUp, Settings } from "iconoir-react";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";

function AuthLayout() {
  const { searchQuery, setSearchQuery, searchError } = useSearch();

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar className={styles.sidebar}></Sidebar>
      <section className={styles.mainContent}>
        <DashboardNavbar
          searchValue={searchQuery}
          searchOnChange={setSearchQuery}
        />
        <DashboardPage />
      </section>
    </div>
  );
}

export default AuthLayout;
