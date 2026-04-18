import { InfoCircle, Xmark } from "iconoir-react";
import styles from "./AlertBox.module.css";

function AlertBox({ children, onClose }) {
  return (
    <div className={styles.alertBox} aria-label="alert box" role="alert">
      <InfoCircle />
      {children}
      <button className={styles.closeButton} onClick={onClose}>
        <Xmark />
      </button>
    </div>
  );
}

export default AlertBox;
