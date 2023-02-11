import { iFile } from "types/files";
import s from "./GridView.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  setAddItemsMultiSelect,
  setCurrentDir,
  setDeleteItemMultiSelect,
  setPushToStack,
} from "redux/slices/controlSlice";
import {
  setShowContextMenu,
  setShowSidebarPreview,
} from "redux/slices/messageSlice";
import clsx from "clsx";
import { getGridFileIcon } from "helpers/getFileIcon";
import { formatDate } from "helpers/formatDate";
import useImage from "hooks/useImage";
import Checkbox from "components/UI-kit/Checkbox/Checkbox";

function GridViewItem({ file }: { file: iFile }) {
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
      className={clsx(s.gridItem, contextMenu?.fileId === file._id && s.active)}
      onClick={openFolderHandler}
      onContextMenu={openContextMenuHadler}
    >
      {useImage(getGridFileIcon(file.type), "icon", s[file.type])}
      <div className={s.textBox}>
        <p className={s.title}>{file.name}</p>
        <span className={s.description}>{formatDate(file.date)}</span>
      </div>
      {multiSelect.isActive && (
        <div className={s.checkboxWrapper}>
          <Checkbox
            state={multiSelect.items.includes(file._id)}
            onChange={addToMultiDeletionStack}
          />
        </div>
      )}
    </div>
  );
}

export default GridViewItem;
