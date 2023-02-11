import s from "./TableView.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { iFile } from "types/files";
import {
  setCurrentDir,
  setAddItemsMultiSelect,
  setPushToStack,
  setDeleteItemMultiSelect,
} from "redux/slices/controlSlice";
import formatSize from "helpers/formatSize";
import clsx from "clsx";
import { getTableFileIcon } from "helpers/getFileIcon";
import {
  setShowContextMenu,
  setShowSidebarPreview,
} from "redux/slices/messageSlice";
import { formatDate } from "helpers/formatDate";
import Checkbox from "components/UI-kit/Checkbox/Checkbox";

function TableViewItem({ file }: { file: iFile }) {
  const dispatch = useAppDispatch();
  const contextMenu = useAppSelector((state) => state.messages.showContextMenu);
  const multiSelect = useAppSelector((state) => state.control.multiSelect);

  const openFolderHandler = () => {
    if (!multiSelect.isActive) {
      if (file.type === "dir") {
        dispatch(setCurrentDir(file._id));
        dispatch(setPushToStack({ id: file._id, name: file.name }));
      } else {
        dispatch(setShowSidebarPreview(file._id));
      }
    }
  };

  const openContextMenuHadler = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const { pageX, pageY } = event;
    if (!multiSelect.isActive) {
      dispatch(setShowSidebarPreview(file._id));
      dispatch(
        setShowContextMenu({
          pageX,
          pageY,
          fileId: file._id,
          variant: "fileOptions",
        })
      );
    }
  };

  const addToMultiDeletionStack = () => {
    if (multiSelect.items.includes(file._id)) {
      dispatch(setDeleteItemMultiSelect(file._id));
    } else {
      dispatch(setAddItemsMultiSelect(file._id));
    }
  };

  return (
    <div
      onClick={openFolderHandler}
      onContextMenu={openContextMenuHadler}
      className={clsx(s.tr, contextMenu?.fileId === file._id && s.active)}
    >
      <div className={s.td}>
        <span className={s.imgBox}>
          {multiSelect.isActive ? (
            <Checkbox
              state={multiSelect.items.includes(file._id)}
              onChange={addToMultiDeletionStack}
            />
          ) : (
            <img src={getTableFileIcon(file.type)} alt="icon" />
          )}
        </span>
        <p>{file.name}</p>
      </div>
      <div className={s.td}>{file.size ? formatSize(file.size) : ""}</div>
      <div className={s.td}>{formatDate(file.date)}</div>
    </div>
  );
}

export default TableViewItem;
