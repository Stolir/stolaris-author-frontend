import styles from "./FormButton.module.css";

function FormButton({ type = "button", onClick, children }) {
  return (
    <button type={type} onClick={onClick} className={styles.formButton}>
      {children}
    </button>
  );
}

export default FormButton;
