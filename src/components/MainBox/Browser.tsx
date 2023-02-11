import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ViewLayout from "components/Layout/ViewLayout";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { SyntheticEvent, useState } from "react";
import { uploadFile } from "redux/slices/fileSlice";
import { setShowContextMenu, setShowSnackbar } from "redux/slices/messageSlice";
import s from "./MainBox.module.scss";

function Browser() {
  const dispatch = useAppDispatch();
  const [isDragble, setIsDragble] = useState(false);
  const control = useAppSelector((state) => state.control);
  const files = useAppSelector((state) => state.files.files);

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

  const dropHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragble(false);
    const uploadFiles = [...event.dataTransfer.files];
    uploadFiles.forEach((file) => {
      const matchName = files.filter(
        (stateFile) => stateFile.name === file.name
      );
      if (!matchName.length) {
        dispatch(uploadFile({ file, dirId: control.currentDir }));
      } else {
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "File already exist",
          })
        );
      }
    });
  };

  const openContextMenuHadler = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    event.preventDefault();
    const { pageX, pageY } = event;
    dispatch(setShowContextMenu({ pageX, pageY, variant: "folderOptions" }));
  };

  return (
    <div
      className={s.browser}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      onDrop={dropHandler}
      onContextMenu={openContextMenuHadler}
    >
      <Breadcrumbs />
      <ViewLayout isDragble={isDragble} />
    </div>
  );
}

export default Browser;
