import { useEffect, useRef, useState } from "react";

function FocusTrap({ children, isOpen, onClose, focusOnCloseRef }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const container = modalRef.current;
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      // By default when closing the focus-trapped element, focus will return to the
      // first element. You may pass a ref to another element if you wish focus to be
      // moved to it instead
      const focusOnClose = focusOnCloseRef?.current || firstElement;
      firstElement.focus();

      function handleTabPress(e) {
        // If the pressed key is not 'Tab' return early
        if (e.key !== "Tab") {
          return;
        }
        // If shift + tab, and on First element set focus to Last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // If tab, and on Last element set focus to First element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
        return;
      }

      function handleEscapePress(e) {
        if (e.key === "Escape") {
          focusOnClose.focus();
          onClose();
        }
      }
      container.addEventListener("keydown", handleTabPress);
      container.addEventListener("keydown", handleEscapePress);

      return () => {
        container.removeEventListener("keydown", handleTabPress);
        container.removeEventListener("keydown", handleEscapePress);
      };
    }
  }, [isOpen]);

  return <div ref={modalRef}>{children}</div>;
}

export default FocusTrap;
