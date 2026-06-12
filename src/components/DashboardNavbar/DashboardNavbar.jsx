import { useLocation } from "react-router";
import LogoutButton from "../LogoutButton/LogoutButton";
import SearchInput from "../SearchInput/SearchInput";
import styles from "./DashboardNavbar.module.css";
import { useMemo } from "react";

function DashboardNavbar({ searchValue, searchOnChange }) {
  const location = useLocation();

  const isSettings = useMemo(
    () => location.pathname.includes("settings"),
    [location.pathname],
  );

  return (
    <header className={styles.header}>
      {!isSettings && (
        <SearchInput value={searchValue} onChange={searchOnChange} />
      )}
      <div className={styles.logoutButton}>
        <LogoutButton />
      </div>
    </header>
  );
}

export default DashboardNavbar;
