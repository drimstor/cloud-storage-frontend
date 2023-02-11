import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import clsx from "clsx";
import s from "./TableView.module.scss";
import { iFile } from "types/files";
import TableViewItem from "./TableViewItem";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Checkbox from "components/UI-kit/Checkbox/Checkbox";
import {
  setAddItemsMultiSelect,
  setClearItemsMultiSelect,
  setSortName,
  setSortOrder,
} from "redux/slices/controlSlice";

function TableView({ files }: { files: iFile[] }) {
  const dispatch = useAppDispatch();
  const control = useAppSelector((state) => state.control);
  const stateFiles = useAppSelector((state) => state.files.files);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const thData = ["Name", "Size", "Date"];

  const selectAllItems = () => {
    setIsSelectedAll(!isSelectedAll);
    if (isSelectedAll) {
      dispatch(setClearItemsMultiSelect());
    } else {
      dispatch(setClearItemsMultiSelect());
      stateFiles.forEach((file) => {
        dispatch(setAddItemsMultiSelect(file._id));
      });
    }
  };

  useEffect(() => {
    setIsSelectedAll(false);
  }, [control.multiSelect.isActive]);

  const tableHeadClickHandler = (name: string) => {
    if (!control.multiSelect.isActive) {
      dispatch(setSortName(name.toLowerCase()));
      dispatch(setSortOrder(!rotate ? 1 : -1));
    }
  };

  const [rotate, setRotate] = useState(false);
  useEffect(() => {
    setRotate(control.sort.order === 1 ? true : false);
  }, [control.sort]);

  return (
    <div className={s.tableBox}>
      <div className={s.table}>
        <div className={s.thead}>
          <div className={s.tr}>
            {thData.map((value, index) => (
              <div
                className={s.th}
                onClick={() => tableHeadClickHandler(value)}
                key={`${value}_${index}`}
              >
                <span
                  className={clsx(
                    s.arrowWrapper,
                    control.multiSelect.isActive &&
                      index === 0 &&
                      s.checkboxWrapper
                  )}
                >
                  {control.multiSelect.isActive && index === 0 ? (
                    <>
                      <Checkbox
                        state={isSelectedAll}
                        onChange={selectAllItems}
                      />
                      {value}
                    </>
                  ) : (
                    value
                  )}
                  {!control.multiSelect.isActive && (
                    <FontAwesomeIcon
                      className={clsx(
                        s.arrow,
                        !rotate && s.rotate,
                        control.sort.name === value.toLowerCase() && s.active
                      )}
                      icon={faChevronDown}
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={s.tbody}>
          <TransitionGroup>
            {!!files.length &&
              files.map((file) => (
                <CSSTransition
                  key={file._id}
                  timeout={300}
                  exit={false}
                  classNames="table-file"
                >
                  <TableViewItem file={file} />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </div>
      </div>
      {!files.length && <p className={s.emptyFolder}>Folder is empty</p>}
    </div>
  );
}

export default TableView;
