import clsx from "clsx";
import Backdrop from "components/Backdrop/Backdrop";
import CloseButton from "components/UI-kit/Buttons/CloseButton";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { SyntheticEvent, useEffect, useState } from "react";
import { createFolder } from "redux/slices/fileSlice";
import { setShowModal, setShowSnackbar } from "redux/slices/messageSlice";
import Button from "../UI-kit/Buttons/Button";
import s from "./Modal.module.scss";

function ModalCreateFolder() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const files = useAppSelector((state) => state.files);
  const currentDir = useAppSelector((state) => state.control.currentDir);
  const messages = useAppSelector((state) => state.messages.showSnackbar);

  const closeModalHandler = () => {
    setIsOpen(false);
    const timer = setTimeout(() => dispatch(setShowModal(null)), 500);
    return () => clearTimeout(timer);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!inputValue) {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: "Please enter name",
        })
      );
    } else if (!!files.files.find((file: any) => file.name === inputValue)) {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: "File already exist",
        })
      );
    } else {
      await dispatch(createFolder({ parent: currentDir, name: inputValue }));
      closeModalHandler();
    }
  };

  const [error, setError] = useState(false);
  useEffect(() => {
    const foundError = messages.filter(
      (err) =>
        err.message.includes("Please enter name") ||
        err.message.includes("File already exist")
    );
    !!foundError.length ? setError(true) : setError(false);
  }, [messages]);

  return (
    <Backdrop modalSize="small" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className={clsx(s.modal, s.createFolder, error && s.error)} onSubmit={handleSubmit}>
        <CloseButton onClick={closeModalHandler} />
        <h2>Create folder</h2>
        <p className={s.label}>Enter name:</p>
        <input
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />

        <Button typeSubmit size="medium" variant="contained">
          Create
        </Button>
      </form>
    </Backdrop>
  );
}

export default ModalCreateFolder;
