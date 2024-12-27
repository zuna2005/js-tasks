import { ReactNode } from "react";
import classes from "./modal.module.css";

interface ModalProps {
  open: boolean;
  children: ReactNode;
}

function Modal({ open, children }: ModalProps) {
  return (
    <div className={classes.modal} style={{ display: open ? "block" : "none" }}>
      <div className={classes.modalContent}>{children}</div>
    </div>
  );
}

export default Modal;
