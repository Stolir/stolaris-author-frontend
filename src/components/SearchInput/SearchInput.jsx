import { Search } from "iconoir-react";
import styles from "./SearchInput.module.css";

function SearchInput({ value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <Search className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchInput;
