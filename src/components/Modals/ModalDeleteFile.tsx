import clsx from "clsx";
import Backdrop from "components/Backdrop/Backdrop";
import Button from "components/UI-kit/Buttons/Button";
import CloseButton from "components/UI-kit/Buttons/CloseButton";
import GetFileById from "helpers/getFileById";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import {
  setActiveMultiSelect,
  setBacketState,
  setDeleteItemMultiSelect,
} from "redux/slices/controlSlice";
import { deleteFile } from "redux/slices/fileSlice";
import { setShowModal } from "redux/slices/messageSlice";
import s from "./Modal.module.scss";

function ModalDeleteFile() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const fileId = useAppSelector((state) => state.messages.showSidebarPreview);
  const multiSelect = useAppSelector((state) => state.control.multiSelect);
  const file = GetFileById(fileId ?? "");

  const closeModalHandler = () => {
    setIsOpen(false);
    const timer = setTimeout(() => dispatch(setShowModal(null)), 500);
    return () => clearTimeout(timer);
  };

  const confirmDeleteHandler = () => {
    if (multiSelect.isActive) {
      multiSelect.items.forEach((item, index) => {
        const timer = setTimeout(
          async () => await dispatch(deleteFile(item)),
          200 * ++index
        );
        dispatch(setDeleteItemMultiSelect(item));
        return () => clearTimeout(timer);
      });
      dispatch(setActiveMultiSelect());
    } else {
      dispatch(
        setBacketState({ isShow: true, isConfirm: true, isCancel: false })
      );
      dispatch(deleteFile(file?._id));
    }
    closeModalHandler();
  };

  const closeWithBusketModalHandler = () => {
    if (!multiSelect.isActive) {
      dispatch(
        setBacketState({ isShow: true, isConfirm: false, isCancel: true })
      );
    }
    closeModalHandler();
  };

  return (
    <Backdrop
      modalSize="small"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      clickOnBackdropHandler={closeWithBusketModalHandler}
    >
      <form className={clsx(s.modal, s.modalDeleteFile)}>
        <CloseButton onClick={closeWithBusketModalHandler} />
        <h2>Are you sure?</h2>
        {multiSelect.isActive ? (
          <span className={s.fileName}>
            {multiSelect.items.length}
            {multiSelect.items.length === 1 ? " file" : " files"}
          </span>
        ) : (
          <>
            <p className={s.label}>
              The {file?.type === "dir" ? "folder" : file?.type}
            </p>
            <span className={s.fileName}>"{file?.name}"</span>
          </>
        )}

        <p className={s.label}> will be deleted</p>
        <div className={s.buttonsBox}>
          <Button
            size="small"
            variant="outlined"
            onClick={closeWithBusketModalHandler}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={confirmDeleteHandler}
          >
            Delete
          </Button>
        </div>
      </form>
    </Backdrop>
  );
}

export default ModalDeleteFile;
