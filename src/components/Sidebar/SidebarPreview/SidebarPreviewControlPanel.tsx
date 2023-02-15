import {
  faDownload,
  faPen,
  faShareNodes,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/UI-kit/Buttons/IconButton";
import ToolTip from "components/UI-kit/Tooltip/ToolTip";
import { useAppDispatch } from "hooks/redux";
import { setBacketState } from "redux/slices/controlSlice";
import { downloadFile } from "redux/slices/fileSlice";
import { setShowModal, setShowSnackbar } from "redux/slices/messageSlice";
import { iFormatFile } from "types/files";
import s from "./SidebarPreview.module.scss";

interface ControlPanelProps {
  file: iFormatFile | null;
  link: string;
}

function SidebarPreviewControlPanel({ file, link }: ControlPanelProps) {
  const dispatch = useAppDispatch();

  const downloadFileHandler = () => {
    dispatch(downloadFile(file));
    if (file?.size! > 2000000)
      dispatch(
        setShowSnackbar({
          variant: "attention",
          message: "File is being prepared",
        })
      );
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

  const getFileLink = () => {
    if (link) navigator.clipboard.writeText(link);
    dispatch(
      setShowSnackbar({
        variant: "success",
        message: "Link has been copied to the clipboard",
      })
    );
  };
  return (
    <div className={s.controlPanel}>
      {file?.type !== "dir" && (
        <ToolTip title={"Download"}>
          <IconButton icon={faDownload} onClick={downloadFileHandler} />
        </ToolTip>
      )}

      <ToolTip title={"Rename"}>
        <IconButton icon={faPen} onClick={renameFileHandler} />
      </ToolTip>

      <ToolTip title={"Delete"}>
        <IconButton icon={faTrashCan} onClick={deleteFileHandler} />
      </ToolTip>

      {file?.type !== "dir" && (
        <ToolTip title={"Copy link"}>
          <IconButton icon={faShareNodes} onClick={getFileLink} />
        </ToolTip>
      )}
    </div>
  );
}

export default SidebarPreviewControlPanel;
