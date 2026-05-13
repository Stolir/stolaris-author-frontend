import { InfoCircle, Xmark } from "iconoir-react";
import styles from "./AlertBox.module.css";
import { useEffect, useRef } from "react";

function AlertBox({ children, onClose, type }) {
  const backgroundColor = `var(${type === "error" ? "--alert-error" : "--alert-success"})`;
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (closeBtnRef) {
      closeBtnRef.current.focus();
    }
  }, [closeBtnRef, children]);

  return (
    <div
      className={styles.alertBox}
      aria-label="alert box"
      role="alert"
      style={{ backgroundColor }}
    >
      <InfoCircle />
      {children}
      <button
        className={styles.closeButton}
        onClick={onClose}
        ref={closeBtnRef}
      >
        <Xmark />
      </button>
    </div>
  );
}

export default AlertBox;
