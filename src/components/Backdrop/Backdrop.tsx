import clsx from "clsx";
import { useAppDispatch } from "hooks/redux";
import { ReactNode, useEffect } from "react";
import { setShowModal } from "redux/slices/messageSlice";
import s from "./Backdrop.module.scss";

interface BackdropProps {
  children: ReactNode;
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
  modalSize: "small" | "medium";
  clickOnBackdropHandler?: () => void;
}

function Backdrop({
  children,
  setIsOpen,
  isOpen,
  modalSize,
  clickOnBackdropHandler,
}: BackdropProps) {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setIsOpen(false);
    clickOnBackdropHandler && clickOnBackdropHandler();
    const timer = setTimeout(() => dispatch(setShowModal(null)), 500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div
      className={clsx(s.backdrop, isOpen && s.show)}
      onClick={handleCloseModal}
    >
      <div
        className={clsx(s.modal, s[modalSize], isOpen && s.show)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Backdrop;
