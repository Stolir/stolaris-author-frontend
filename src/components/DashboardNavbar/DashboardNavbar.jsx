import { useLocation } from "react-router";
import LogoutButton from "../LogoutButton/LogoutButton";
import SearchInput from "../SearchInput/SearchInput";
import styles from "./DashboardNavbar.module.css";

function DashboardNavbar({ searchValue, searchOnChange }) {
  const location = useLocation();

  return (
    <header className={styles.header}>
      {location.pathname.includes("library") && (
        <SearchInput value={searchValue} onChange={searchOnChange} />
      )}
      <div className={styles.logoutButton}>
        <LogoutButton />
      </div>
    </header>
  );
}

export default DashboardNavbar;
