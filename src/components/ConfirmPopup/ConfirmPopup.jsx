import styles from "./ConfirmPopup.module.css";

function ConfirmPopup({ onConfirm, onClose, children }) {
  return (
    <div
      role="alertdialog"
      aria-label="Confirm choice"
      className={styles.confirmPopup}
    >
      <p>{children}</p>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
