import styles from "./CustomButton.module.css";

function CustomButton({ type = "button", text, onClick }) {
  return (
    <button type={type} onClick={onClick} className={styles.customButton}>
      {text}
    </button>
  );
}

export default CustomButton;
