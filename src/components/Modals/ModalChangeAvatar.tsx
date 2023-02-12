import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Backdrop from "components/Backdrop/Backdrop";
import Button from "components/UI-kit/Buttons/Button";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import s from "./Modal.module.scss";
import { API_URL } from "config";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { deleteAvatar, uploadAvatar } from "redux/slices/userSlice";
import { setShowModal, setShowSnackbar } from "redux/slices/messageSlice";
import useImage from "hooks/useImage";
import CloseButton from "components/UI-kit/Buttons/CloseButton";

function ModalChangeAvatar() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isDragble, setIsDragble] = useState(false);
  const [showDragDrop, setshowDragDrop] = useState(false);
  const avatar = useAppSelector((state) => state.user.profile?.avatar);

  const fileUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDragble(false);
    if (event.target.files && event.target.files[0].type.includes("image")) {
      dispatch(uploadAvatar(event.target.files[0]));
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "Image has been uploaded",
        })
      );
      closeModalHandler();
    } else {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: "The file format is not an image",
        })
      );
    }
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files[0].type.includes("image")) {
      dispatch(uploadAvatar(event.dataTransfer.files[0]));
      dispatch(
        setShowSnackbar({
          variant: "success",
          message: "Image has been uploaded",
        })
      );
      closeModalHandler();
    } else {
      dispatch(
        setShowSnackbar({
          variant: "fail",
          message: "The file format is not an image",
        })
      );
    }
    setIsDragble(false);
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

  const closeModalHandler = () => {
    setIsOpen(false);
    const timer = setTimeout(() => dispatch(setShowModal(null)), 500);
    return () => clearTimeout(timer);
  };

  return (
    <Backdrop modalSize="small" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className={clsx(s.modal, s.uploadFile)}>
        <CloseButton onClick={closeModalHandler} />
        <h2>Change avatar</h2>
        <div className={s.changeAvatarBox}>
          {avatar ? (
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useImage(API_URL + avatar, "avatar")
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}

          <div className={s.buttonsBox}>
            {avatar && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(deleteAvatar())}
              >
                Delete
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              onClick={() => setshowDragDrop(!showDragDrop)}
            >
              {avatar ? "Change" : "Upload"}
            </Button>
          </div>

          {isDragble ? (
            <div
              className={clsx(s.dragDrop, s.dragble)}
              onDragEnter={dragEnterHandler}
              onDragLeave={dragLeaveHandler}
              onDragOver={dragEnterHandler}
              onDrop={dropHandler}
            >
              Drag your picture here to start uploading.
            </div>
          ) : (
            <div
              className={clsx(s.dragDrop, !showDragDrop && s.changeAvatar)}
              onDragEnter={dragEnterHandler}
              onDragLeave={dragLeaveHandler}
              onDragOver={dragEnterHandler}
            >
              <FontAwesomeIcon icon={faFolderOpen} />
              <p>Drag your picture here to start uploading.</p>
              <span>OR</span>
              <Button variant="contained" size="medium">
                <input
                  onChange={fileUploadHandler}
                  type="file"
                  id="file"
                  accept=".jpg, .jpeg, .png, .webp, .gif, .svg, .ico, .tiff, .bmp"
                />
                <label htmlFor="file">Browse picture</label>
              </Button>
            </div>
          )}
        </div>
      </form>
    </Backdrop>
  );
}

export default ModalChangeAvatar;
