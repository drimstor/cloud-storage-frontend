import { useEffect, useState } from "react";
import s from "./SidebarPreview.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import clsx from "clsx";
import { iFormatFile } from "types/files";
import formatSize from "helpers/formatSize";
import { getGridFileIcon } from "helpers/getFileIcon";
import { formatDate } from "helpers/formatDate";
import { API_URL } from "config";
import CloseButton from "components/UI-kit/Buttons/CloseButton";
import Image from "helpers/Image";
import { setShowSidebarPreview } from "redux/slices/messageSlice";
import SidebarPreviewControlPanel from "./SidebarPreviewControlPanel";

function SidebarPreview() {
  const dispatch = useAppDispatch();
  const fileId = useAppSelector((state) => state.messages.showSidebarPreview);
  const user = useAppSelector((state) => state.user.profile);
  const files = useAppSelector((state) => state.files.files);
  const multiSelect = useAppSelector((state) => state.control.multiSelect);
  const [fileInfo, setFileInfo] = useState<iFormatFile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const link =
    API_URL + "/" + user?.id + "/" + fileInfo?.path ?? fileInfo?.name;

  useEffect(() => {
    const file = files.filter((file) => file._id === fileId)[0];

    const formatFileInfo = {
      _id: file?._id,
      path: file?.path,
      name: file?.name,
      date: file?.date,
      type: file?.type,
      size: file?.size,
    };

    if (file?.type === "dir") {
      delete formatFileInfo.size;
    }

    if (isOpen && fileId) {
      const timer = setTimeout(() => setFileInfo(formatFileInfo), 400);
      return () => clearTimeout(timer);
    } else {
      setFileInfo(formatFileInfo);
    }
  }, [fileId, files]);

  useEffect(() => {
    if (isOpen && fileId) {
      setIsOpen(false);
      const timer = setTimeout(() => setIsOpen(true), 400);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(true);
    }
  }, [fileId]);

  useEffect(() => {
    const file = files.filter((file) => file._id === fileId)[0];
    if (!file) {
      closeSidebarPreviewHandler();
    }
  }, [files]);

  useEffect(() => {
    if (multiSelect.isActive) {
      closeSidebarPreviewHandler();
    }
  }, [multiSelect]);

  const closeSidebarPreviewHandler = () => {
    setIsOpen(false);
    document.body.style.pointerEvents = "none";
    const timer = setTimeout(closeModalHandler, 500);
    return () => clearTimeout(timer);
  };

  const closeModalHandler = () => {
    dispatch(setShowSidebarPreview(null));
    document.body.style.pointerEvents = "auto";
  };

  return (
    <div className={clsx(s.preview, isOpen && s.opened)}>
      <CloseButton onClick={closeSidebarPreviewHandler} />

      <div className={s.wrapper}>
        <h2 className={s.name} title={fileInfo ? fileInfo.name : ""}>
          {fileInfo && fileInfo.name}
        </h2>
        <div className={s.format}>
          {fileInfo?.type === "dir"
            ? "Folder"
            : fileInfo?.name &&
              fileInfo?.name.split(".").reverse()[0].toUpperCase() +
                "-" +
                fileInfo?.type +
                " - " +
                formatSize(fileInfo?.size)}
        </div>

        <div className={s.previewPictureBox}>
          {Image(
            fileInfo?.type === "picture"
              ? link
              : fileInfo?.type && getGridFileIcon(fileInfo?.type),
            "preview",
            clsx(fileInfo?.type && s[fileInfo?.type])
          )}
        </div>

        <SidebarPreviewControlPanel file={fileInfo} link={link} />

        <h3 className={s.tableTitle}>Information</h3>
        <table className={s.table}>
          <tbody>
            {fileInfo &&
              Object.entries(fileInfo)
                .slice(2)
                .map((file, index) => (
                  <tr key={index}>
                    <td className={s.tableName}>{file[0]}</td>
                    <td
                      className={s.tableValue}
                      title={
                        file[0] === "name" && typeof file[1] === "string"
                          ? file[1]
                          : ""
                      }
                    >
                      {file[0] === "size"
                        ? formatSize(file[1])
                        : file[0] === "date"
                        ? formatDate(file[1])
                        : file[1] === "dir"
                        ? "folder"
                        : file[1]}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SidebarPreview;
