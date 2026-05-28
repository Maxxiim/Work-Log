import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./Portal.module.scss";

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Portal({ isOpen, onClose, children }: PortalProps) {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          Закрыть
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
