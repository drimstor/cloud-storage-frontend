import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import useClickOutside from "hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import {
  setActiveMultiSelect,
  setBacketState,
  setClearItemsMultiSelect,
} from "redux/slices/controlSlice";
import { setShowContextMenu, setShowModal } from "redux/slices/messageSlice";
import s from "./ContextMenu.module.scss";

function FileContextMenu() {
  const contextMenuRef = useRef(null);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const control = useAppSelector((state) => state.control);
  const showContextMenu = useAppSelector(
    (state) => state.messages.showContextMenu
  );

  useEffect(() => {
    setShow(true);
  }, []);

  const closeMenuHandler = () => {
    setShow(false);
    const timer = setTimeout(() => dispatch(setShowContextMenu(null)), 300);
    return () => clearTimeout(timer);
  };

  const deleteFileHandler = () => {
    dispatch(setShowModal("deleteFile"));
    dispatch(
      setBacketState({ isShow: true, isConfirm: false, isCancel: false })
    );
  };

  const renameFileHandler = () => {
    dispatch(setShowModal("renameFile"));
  };

  const createFolderFileHandler = () => {
    dispatch(setShowModal("createFolder"));
  };

  const uploadFileFileHandler = () => {
    dispatch(setShowModal("uploadFile"));
  };

  const toggleMultiSelectHandler = () => {
    dispatch(setActiveMultiSelect());
    if (control.multiSelect.isActive) {
      dispatch(setClearItemsMultiSelect());
    }
  };

  useClickOutside(contextMenuRef, closeMenuHandler);

  const optionsObject = {
    fileOptions: [
      {
        name: "Rename",
        onClick: renameFileHandler,
      },
      {
        name: "Delete",
        onClick: deleteFileHandler,
      },
    ],
    folderOptions: [
      {
        name: "Create folder",
        onClick: createFolderFileHandler,
      },
      {
        name: "Upload file",
        onClick: uploadFileFileHandler,
      },
      {
        name: "Select files",
        onClick: toggleMultiSelectHandler,
      },
    ],
  };

  return (
    <ul
      onClick={closeMenuHandler}
      className={clsx(s.contextMenuBox, show && s.show)}
      ref={contextMenuRef}
      style={{
        top: `${showContextMenu?.pageY}px`,
        left: `${showContextMenu?.pageX}px`,
      }}
    >
      {optionsObject[showContextMenu?.variant ?? "fileOptions"].map((item) => (
        <li className={s.item} onClick={item.onClick} key={item.name}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default FileContextMenu;
