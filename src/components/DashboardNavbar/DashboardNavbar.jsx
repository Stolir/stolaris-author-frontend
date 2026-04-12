import LogoutButton from "../LogoutButton/LogoutButton";
import SearchInput from "../SearchInput/SearchInput";
import styles from "./DashboardNavbar.module.css";

function DashboardNavbar({ searchValue, searchOnChange }) {
  return (
    <header className={styles.header}>
      <SearchInput value={searchValue} onChange={searchOnChange} />
      <LogoutButton />
    </header>
  );
}

export default DashboardNavbar;
