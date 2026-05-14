import { useEffect, useRef } from "react";
import FocusTrap from "../FocusTrap/FocusTrap";
import styles from "./ConfirmPopup.module.css";

function ConfirmPopup({
  isOpen,
  onConfirm,
  onClose,
  focusOnCloseRef,
  children,
}) {
  const backdropRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      function handleBackdropClick(e) {
        if (e.target === backdropRef.current) {
          onClose();
        }
      }

      document.addEventListener("click", handleBackdropClick);

      return () => {
        document.removeEventListener("click", handleBackdropClick);
      };
    }
  });

  return (
    <div className={styles.dialogBackground} ref={backdropRef}>
      <FocusTrap
        isOpen={isOpen}
        onClose={onClose}
        focusOnCloseRef={focusOnCloseRef}
      >
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
      </FocusTrap>
    </div>
  );
}

export default ConfirmPopup;
