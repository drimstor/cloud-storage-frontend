import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import s from "./UploadingMenu.module.scss";
import UploadingMenuItem from "./UploadingMenuItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  setClearUploadFiles,
  setToggleShowUploader,
} from "redux/slices/messageSlice";
import CloseButton from "components/UI-kit/Buttons/CloseButton";

function UploadingMenu() {
  const dispatch = useAppDispatch();
  const files = useAppSelector((state) => state.messages.showUploader);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const completedUploads = files.uploadingFiles.filter(
      (file) => file.progress === 100
    );

    if (completedUploads.length === files.uploadingFiles.length) {
      const timer = setTimeout(closeUploadingMenuHandler, 10000);
      return () => clearTimeout(timer);
    }
  }, [files]);

  useEffect(() => {
    setIsShow(true);
  }, []);

  const closeUploadingMenuHandler = () => {
    setIsShow(false);

    const timer = setTimeout(closeAndClearUploadFiles, 500);
    return () => clearTimeout(timer);
  };

  const closeAndClearUploadFiles = () => {
    dispatch(setToggleShowUploader(false));
    dispatch(setClearUploadFiles());
  };

  return (
    <div className={clsx(s.wrapper, isShow && s.show)}>
      <CloseButton onClick={closeUploadingMenuHandler} />
      <h2>Uploading</h2>
      <div className={s.uploadsBox}>
        <TransitionGroup>
          {files &&
            files.uploadingFiles.map((file) => (
              <CSSTransition
                key={file._id}
                timeout={300}
                exit={false}
                classNames="table-file"
              >
                <UploadingMenuItem file={file} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default UploadingMenu;
