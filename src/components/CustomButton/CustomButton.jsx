import styles from "./CustomButton.module.css";

function CustomButton({ type = "button", text, onClick, icon = null }) {
  return (
    <button type={type} onClick={onClick} className={styles.customButton}>
      {icon}
      <span>{text}</span>
    </button>
  );
}

export default CustomButton;
