import clsx from "clsx";
import Backdrop from "components/Backdrop/Backdrop";
import CloseButton from "components/UI-kit/Buttons/CloseButton";
import GetFileById from "helpers/getFileById";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { SyntheticEvent, useEffect, useState } from "react";
import { renameFile } from "redux/slices/fileSlice";
import { setShowModal, setShowSnackbar } from "redux/slices/messageSlice";
import Button from "../UI-kit/Buttons/Button";
import s from "./Modal.module.scss";

function ModalRenameFile() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const fileId = useAppSelector((state) => state.messages.showSidebarPreview);
  const file = GetFileById(fileId ?? "");

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(file?.name ?? "");
  }, [file]);

  const messages = useAppSelector((state) => state.messages.showSnackbar);
  const [error, setError] = useState(false);
  useEffect(() => {
    const foundError = messages.filter((err) =>
      [
        "Please enter name",
        "File formats do not match",
        "The file name has not changed",
      ].includes(err.message)
    );
    !!foundError.length ? setError(true) : setError(false);
  }, [messages]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const oldFileType = file?.name.split(".").pop();
    const newFileType = inputValue && inputValue.split(".").pop();

    if (!inputValue) {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: "Please enter name",
        })
      );
    } else if (file?.name === inputValue) {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: "The file name has not changed",
        })
      );
    } else if (file?.type !== "dir" && oldFileType !== newFileType) {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: "File formats do not match",
        })
      );
    } else {
      await dispatch(renameFile({ id: fileId, newName: inputValue }));
      closeModalHandler();
    }
  };

  const closeModalHandler = () => {
    setIsOpen(false);
    const timer = setTimeout(() => dispatch(setShowModal(null)), 500);
    return () => clearTimeout(timer);
  };

  return (
    <Backdrop modalSize="small" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        className={clsx(s.modal, s.renameFile, error && s.error)}
        onSubmit={handleSubmit}
      >
        <CloseButton onClick={closeModalHandler} />
        <h2>Rename file</h2>
        <p className={s.label}>Enter name:</p>
        <input
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />

        <Button typeSubmit size="medium" variant="contained">
          Rename
        </Button>
      </form>
    </Backdrop>
  );
}

export default ModalRenameFile;
