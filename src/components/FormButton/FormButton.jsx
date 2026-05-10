import styles from "./FormButton.module.css";

function FormButton({ type = "button", onClick, children, disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.formButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default FormButton;
