import styles from "./SearchInput.module.css";

function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={styles.SearchInput}
    ></input>
  );
}

export default SearchInput;
