import GridView from "components/GridView/GridView";
import { PreLoader } from "components/Loaders/PreLoader";
import TableView from "components/TableView/TableView";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { getFiles, setSortFiles } from "redux/slices/fileSlice";
import s from "../MainBox/MainBox.module.scss";

interface ViewLayoutProps {
  isDragble: boolean;
}

function ViewLayout({ isDragble }: ViewLayoutProps) {
  const dispatch = useAppDispatch();
  const files = useAppSelector((state) => state.files.files);
  const messages = useAppSelector((state) => state.messages);
  const control = useAppSelector((state) => state.control);

  useEffect(() => {
    dispatch(getFiles(control.currentDir));
  }, [control.currentDir, control.sort]);

  useEffect(() => {
    !!files.length && dispatch(setSortFiles(control.sort));
  }, [files]);

  if (messages.showLoader) {
    return (
      <div className={s.preloaderBox}>
        <PreLoader />
      </div>
    );
  }

  if (isDragble) {
    return (
      <div className={s.dragArea}>Drag your files here to start uploading.</div>
    );
  }

  return (
    <>
      {control.viewVariant === "list" && <TableView files={files} />}
      {control.viewVariant === "grid" && <GridView files={files} />}
    </>
  );
}

export default ViewLayout;
