import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Backdrop from "components/Backdrop/Backdrop";
import Button from "components/UI-kit/Buttons/Button";
import CloseButton from "components/UI-kit/Buttons/CloseButton";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { SyntheticEvent, useState } from "react";
import { uploadFile } from "redux/slices/fileSlice";
import { setShowModal, setShowSnackbar } from "redux/slices/messageSlice";
import s from "./Modal.module.scss";

function ModalUploadFile() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isDragble, setIsDragble] = useState(false);
  const currentDir = useAppSelector((state) => state.control.currentDir);
  const stateFiles = useAppSelector((state) => state.files.files);

  const closeModalHandler = () => {
    setIsOpen(false);
    setTimeout(() => dispatch(setShowModal(null)), 500);
  };

  const fileUploadHandler = (event: any) => {
    setIsDragble(false);
    const files = [...event.target.files];
    files.forEach((file) => {
      const matchName = stateFiles.filter(
        (stateFile) => stateFile.name === file.name
      );
      if (!matchName.length) {
        dispatch(uploadFile({ file, dirId: currentDir }));
      } else {
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "File already exist",
          })
        );
      }
    });
    closeModalHandler();
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.dataTransfer.files];
    files.forEach((file) => {
      const matchName = stateFiles.filter(
        (stateFile) => stateFile.name === file.name
      );
      if (!matchName.length) {
        dispatch(uploadFile({ file, dirId: currentDir }));
      } else {
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "File already exist",
          })
        );
      }
    });
    closeModalHandler();
  };

  const dragEnterHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragble(true);
  };

  const dragLeaveHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragble(false);
  };

  return (
    <Backdrop modalSize="small" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className={clsx(s.modal, s.uploadFile)}>
        <CloseButton onClick={closeModalHandler} />
        <h2>Upload file</h2>
        {isDragble ? (
          <div
            className={clsx(s.dragDrop, s.dragble)}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
            onDrop={dropHandler}
          >
            Drag your files here to start uploading.
          </div>
        ) : (
          <div
            className={s.dragDrop}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
          >
            <FontAwesomeIcon icon={faFolderOpen} />
            <p>Drag your files here to start uploading.</p>
            <span>OR</span>
            <Button variant="contained" size="medium">
              <input
                onChange={fileUploadHandler}
                multiple
                type="file"
                id="file"
              />
              <label htmlFor="file">Browse files</label>
            </Button>
          </div>
        )}
      </form>
    </Backdrop>
  );
}

export default ModalUploadFile;
